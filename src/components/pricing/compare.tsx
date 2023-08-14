import React, { useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import pricingData from '@/data/pricing.json';
import { CheckIcon, QuestionMarkIcon } from '@radix-ui/react-icons';
import Tooltip from '@/components/shared/tooltip';
import GetStartedButton from '@/components/shared/get-started-button';
import RequestADemoButton from '@/components/shared/request-a-demo-button';

function Compare() {
  const { t } = useTranslation();
  const data = useMemo(() => {
    return [
      {
        name: <div className={'text-[18px] font-bold'}>{t('content')}</div>,
        columns: [
          <div key='free' className={'text-primary text-[18px] font-bold'}>
            {t('pricing.free.name')}
          </div>,
          <div key='plus' className={'text-primary text-[18px] font-bold'}>
            {t('pricing.plus.name')}
          </div>,
          <div key='business' className={'text-primary text-[18px] font-bold'}>
            {t('pricing.business.name')}
          </div>,
          <div key='enterprise' className={'text-primary text-[18px] font-bold'}>
            {t('pricing.enterprise.name')}
          </div>,
        ],
      },
      {
        name: t('pricing.pages-and-blocks'),
        tooltip: t('pricing.pages-and-blocks-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return 'pages-and-blocks' in item ? t(item['pages-and-blocks']) : t('unlimited');
        }),
      },
      {
        name: t('pricing.file-uploads'),
        tooltip: t('pricing.file-uploads-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return 'file-uploads' in item
            ? t('up-to', {
                size: item['file-uploads'],
              })
            : t('unlimited');
        }),
      },
      {
        name: t('pricing.page-history'),
        tooltip: t('pricing.page-history-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return t('days', {
            days: item['page-history'],
          });
        }),
      },
      {
        name: t('pricing.page-analytics'),
        tooltip: t('pricing.page-analytics-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['page-analytics-advanced'] ? t('advanced') : t('basic');
        }),
      },
      {
        name: <div className={'text-[18px] font-bold'}>{t('pricing.sharing-and-collaboration')}</div>,
        columns: [],
      },
      {
        name: t('pricing.collaborative-workspace'),
        tooltip: t('pricing.collaborative-workspace-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['collaborative-workspace'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.guest-collaborators'),
        tooltip: t('pricing.guest-collaborators-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['guest-contributors'];
        }),
      },
      {
        name: t('pricing.custom-domain'),
        tooltip: t('pricing.custom-domain-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['custom-domain'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.permission-groups'),
        tooltip: t('pricing.permission-groups-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['permission-groups'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.team-spaces-open'),
        tooltip: t('pricing.team-spaces-open-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['team-spaces-open'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.team-spaces-private'),
        tooltip: t('pricing.team-spaces-private-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['team-spaces-private'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.advanced-team-space-permissions'),
        tooltip: t('pricing.advanced-team-space-permissions-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['advanced-teamspace-permissions'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: <div className={'text-[18px] font-bold'}>{t('support')}</div>,
        columns: [],
      },
      {
        name: t('pricing.priority-support'),
        tooltip: t('pricing.priority-support-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['priority-support'] ? <CheckIcon /> : null;
        }),
      },
      {
        name: t('pricing.dedicated-success-manager'),
        tooltip: t('pricing.dedicated-success-manager-tooltip'),
        columns: Object.keys(pricingData).map((key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const item = pricingData[key];

          return item['dedicated-success-manager'] ? <CheckIcon /> : null;
        }),
      },
    ];
  }, [t]);

  const footer = useMemo(
    () => [
      {
        name: t('pricing.free.name'),
        price: t('pricing.free.name'),
        priceDesc: t('pricing.free.price-desc'),
        button: <GetStartedButton className={'py-4 text-base'} />,
      },
      {
        name: t('pricing.plus.name'),
        price: `$${pricingData.plus.price}`,
        priceDesc: t('pricing.plus.price-desc'),
        button: <GetStartedButton className={'py-4 text-base'} />,
      },
      {
        name: t('pricing.business.name'),
        price: `$${pricingData.business.price}`,
        priceDesc: t('pricing.business.price-desc'),
        button: <GetStartedButton className={'py-4 text-base'} />,
      },
      {
        name: t('pricing.enterprise.name'),
        price: `$${pricingData.enterprise.price}`,
        priceDesc: t('pricing.enterprise.price-desc'),
        button: <RequestADemoButton className={'py-4  text-base'} />,
      },
    ],
    [t]
  );

  return (
    <div id='compare' className={'flex min-h-screen w-full max-w-screen-lg flex-col items-center justify-center py-36'}>
      <div className={'panel-title'}>
        <span className={'relative'}>
          {t('pricing.compare.title.main')}
          <span className={'bg-primary absolute -bottom-1 left-0 h-1 w-full'}></span>
        </span>
        {t('pricing.compare.title.suffix')}
      </div>
      <div className={'flex w-full flex-col'}>
        {data.map((item, index) => (
          <div
            key={index}
            className={`border-border-purple flex border-b py-4 ${item.columns.length === 0 ? 'mt-10' : ''}`}
          >
            <div className={'flex w-[460px] items-center'}>
              {item.name}
              {item.tooltip && (
                <Tooltip content={item.tooltip}>
                  <button
                    className={' border-border-purple ml-3 flex h-4 w-4 items-center justify-center rounded-full border'}
                  >
                    <QuestionMarkIcon width={12} height={12} className={'text-border-purple'} />
                  </button>
                </Tooltip>
              )}
            </div>
            {item.columns.map((column, index) => (
              <div key={index} className={'flex flex-1'}>
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={'mt-10 flex w-full justify-end'}>
        {footer.map((item, index) => (
          <div key={index} className={'mx-4 flex w-[200px] flex-col'}>
            <div className={'text-md my-3 font-bold'}>{item.name}</div>
            <div className={'my-6 text-[30px] font-bold leading-10'}>{item.price}</div>
            <div className={'text-text-gray my-3'}>{item.priceDesc}</div>
            <div className={'mt-3 w-full'}>{item.button}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Compare;
