import 'server-only';

import { unstable_cache } from 'next/cache';
import { CloudProPricing, parseCloudProPricing } from './cloud-pricing';

const getCachedCloudProPricing = unstable_cache(
  async (baseUrl: string): Promise<CloudProPricing> => {
    const response = await fetch(`${baseUrl}/billing/api/v1/pricing`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Billing pricing request failed with status ${response.status}`);
    }

    // Cache only validated prices. Failed refreshes keep the last valid catalog,
    // including when the API returns HTTP 200 with an invalid response body.
    return parseCloudProPricing(await response.json());
  },
  ['cloud-pro-pricing-v1'],
  { revalidate: 300 },
);

export async function getCloudProPricing(): Promise<CloudProPricing | null> {
  const baseUrl = process.env.BILLING_API_BASE_URL || 'https://beta.appflowy.cloud';

  try {
    return await getCachedCloudProPricing(baseUrl.replace(/\/$/, ''));
  } catch (error) {
    // Handle cold-cache failures outside the cache so the next request can retry.
    console.error('Cloud Pro pricing is temporarily unavailable', error);

    return null;
  }
}
