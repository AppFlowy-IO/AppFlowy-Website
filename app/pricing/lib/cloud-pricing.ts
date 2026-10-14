/** Only the billing fields needed by the Cloud Pro pricing page. Amounts are per member. */
export interface CloudProPricing {
  currency: 'USD';
  monthlyCents: number;
  yearlyCents: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/** Reject incomplete catalogs rather than presenting an incorrect checkout price. */
export function parseCloudProPricing(response: unknown): CloudProPricing {
  if (!isRecord(response) || response.code !== 0 || !isRecord(response.data)) {
    throw new Error('Billing pricing request did not return a successful catalog');
  }

  const catalog = response.data;

  if (catalog.version !== 1 || catalog.currency !== 'USD' || !Array.isArray(catalog.plans)) {
    throw new Error('Unsupported billing pricing catalog');
  }

  const proPlans = catalog.plans.filter((plan) => isRecord(plan) && plan.id === 'pro');
  const pro = proPlans[0];

  if (proPlans.length !== 1 || !isRecord(pro) || pro.kind !== 'workspace_plan' || !Array.isArray(pro.prices)) {
    throw new Error('Billing pricing catalog must contain one Cloud Pro workspace plan');
  }

  const prices = pro.prices;
  const amountFor = (interval: 'month' | 'year'): number => {
    const matches = prices.filter((price) => isRecord(price) && price.interval === interval);
    const amount = matches[0]?.price_cents;

    if (matches.length !== 1 || typeof amount !== 'number' || !Number.isSafeInteger(amount) || amount <= 0) {
      throw new Error(`Billing pricing catalog has an invalid Pro ${interval} price`);
    }

    return amount;
  };

  return { currency: catalog.currency, monthlyCents: amountFor('month'), yearlyCents: amountFor('year') };
}

/** The yearly API price is the full annual total; divide by twelve only for monthly display. */
export function priceAmount(cents: number): string {
  return Number((cents / 100).toFixed(2)).toString();
}

export function formatPrice(cents: number): string {
  return `$${priceAmount(cents)}`;
}

export function annualSavingsPercent(pricing: CloudProPricing): number {
  const monthlyTotal = pricing.monthlyCents * 12;

  return Math.max(0, Math.floor(((monthlyTotal - pricing.yearlyCents) * 100) / monthlyTotal));
}

/** Publish Pro offers only when the catalog supplies validated amounts. */
export function getCloudProOffers(pricing: CloudProPricing | null) {
  if (!pricing) return [];

  return [
    { name: 'Annual', cents: pricing.yearlyCents / 12, unitText: 'member per month, billed annually' },
    { name: 'Monthly', cents: pricing.monthlyCents, unitText: 'member per month, billed monthly' },
  ].map(({ name, cents, unitText }) => ({
    '@type': 'Offer',
    name: `Pro Plan (${name} billing)`,
    description: 'For professional work and teams',
    price: priceAmount(cents),
    priceCurrency: pricing.currency,
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: priceAmount(cents),
      priceCurrency: pricing.currency,
      billingIncrement: 'month',
    },
    eligibleQuantity: {
      '@type': 'QuantitativeValue',
      unitText,
    },
  }));
}
