import { getCloudFAQs } from '../../app/pricing/config/cloud-faqs';
import { getPricingPlans } from '../../app/pricing/config/pricing-plans';
import { annualSavingsPercent, getCloudProOffers, parseCloudProPricing } from '../../app/pricing/lib/cloud-pricing';

const catalog = (monthly: unknown, yearly: unknown) => ({
  code: 0,
  data: {
    version: 1,
    currency: 'USD',
    // A catalog-wide discount is not the source for a plan's actual savings.
    annual_discount_percent: 20,
    plans: [
      { id: 'free', kind: 'workspace_plan', prices: [] },
      {
        id: 'pro',
        kind: 'workspace_plan',
        prices: [
          { interval: 'year', price_cents: yearly },
          { interval: 'month', price_cents: monthly },
        ],
      },
    ],
  },
});

describe('Cloud pricing from billing', () => {
  for (const rates of [
    {
      monthly: 2000,
      yearly: 19200,
      monthlyLabel: '$20',
      annualLabel: '$16',
      annualTotal: '$192',
      fiveAnnual: '$960',
      fiveMonthly: '$100',
      savings: 20,
    },
    {
      monthly: 1600,
      yearly: 14400,
      monthlyLabel: '$16',
      annualLabel: '$12',
      annualTotal: '$144',
      fiveAnnual: '$720',
      fiveMonthly: '$80',
      savings: 25,
    },
    {
      monthly: 1250,
      yearly: 12000,
      monthlyLabel: '$12.5',
      annualLabel: '$10',
      annualTotal: '$120',
      fiveAnnual: '$600',
      fiveMonthly: '$62.5',
      savings: 20,
    },
  ]) {
    it(`uses ${rates.monthly}/${rates.yearly} cents across cards, savings and FAQs`, () => {
      const pricing = parseCloudProPricing(catalog(rates.monthly, rates.yearly));
      const card = getPricingPlans(pricing).find((plan) => plan.id === 'pro')!;
      const faqs = getCloudFAQs(pricing);

      expect(card.pricing.monthly.price).to.equal(`US${rates.monthlyLabel}`);
      expect(card.pricing.yearly.price).to.equal(`US${rates.annualLabel}`);
      expect(card.pricing.yearly.originalPrice).to.equal(rates.monthlyLabel);
      expect(annualSavingsPercent(pricing)).to.equal(rates.savings);
      expect(faqs[0].answer).to.include(`${rates.annualTotal}/year`);
      expect(faqs[0].answer).to.include(`${rates.fiveAnnual}/year`);
      expect(faqs[0].answer).to.include(`${rates.fiveMonthly} billed monthly`);
      expect(faqs[4].answer).to.include(`${rates.savings}%`);
      expect(getCloudProOffers(pricing).map((offer) => offer.price)).to.deep.equal([
        rates.annualLabel.slice(1),
        rates.monthlyLabel.slice(1),
      ]);
    });
  }

  it('rejects failed, unsupported, incomplete or ambiguous catalogs', () => {
    const missingAnnual = catalog(1600, 14400);
    missingAnnual.data.plans[1].prices = [{ interval: 'month', price_cents: 1600 }];
    const duplicateAnnual = catalog(1600, 14400);
    duplicateAnnual.data.plans[1].prices.push({ interval: 'year', price_cents: 19200 });
    const duplicatePro = catalog(1600, 14400);
    duplicatePro.data.plans.push(duplicatePro.data.plans[1]);

    for (const invalid of [
      null,
      { ...catalog(1600, 14400), code: 500 },
      { code: 0, data: { ...catalog(1600, 14400).data, version: 2 } },
      { code: 0, data: { ...catalog(1600, 14400).data, currency: 'EUR' } },
      { code: 0, data: { ...catalog(1600, 14400).data, plans: [] } },
      catalog('1600', 14400),
      catalog(1600, 0),
      catalog(-1600, 14400),
      catalog(1600, 14400.5),
      catalog(1600, Number.MAX_SAFE_INTEGER + 1),
      missingAnnual,
      duplicateAnnual,
      duplicatePro,
    ]) {
      expect(() => parseCloudProPricing(invalid)).to.throw();
    }
  });

  it('does not advertise savings when annual billing offers no discount', () => {
    const pricing = parseCloudProPricing(catalog(1600, 19200));

    expect(annualSavingsPercent(pricing)).to.equal(0);
    expect(getCloudFAQs(pricing)[4].answer).not.to.include('Annual billing saves');
  });

  it('omits invented prices and structured offers when the catalog is unavailable', () => {
    const faqs = getCloudFAQs(null);

    expect(faqs[0].answer).to.include('temporarily unavailable');
    expect(faqs.map((faq) => faq.answer).join(' ')).not.to.match(/\$|saves \d+%/);
    expect(getCloudProOffers(null)).to.deep.equal([]);
  });
});
