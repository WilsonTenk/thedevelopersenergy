import { MarketRate } from '../types';

export interface LiveOilPrice {
  code: string;
  price: number;
  change: number;
  changePct: number;
  createdAt: string;
  formatted: string;
  unit: string;
}

const API_TOKEN = 'd97b52bc471a5afccd2b09462fdcb361c7de08ed4714f6face00de9913e8cd01';
const BASE_URL = 'https://api.oilpriceapi.com/v1/prices/latest';

export async function fetchLivePrice(code: string): Promise<LiveOilPrice | null> {
  try {
    const response = await fetch(`${BASE_URL}?by_code=${code}`, {
      headers: {
        Authorization: `Token ${API_TOKEN}`,
      },
    });

    const body = await response.json();
    if (!response.ok || body.status !== 'success' || !body.data) {
      throw new Error(body?.error?.message ?? `HTTP ${response.status}`);
    }

    const data = body.data;
    const changeAmt = data.changes?.['24h']?.amount ?? 0;
    const changePct = data.changes?.['24h']?.percent ?? 0;

    return {
      code: data.code,
      price: data.price,
      change: Number(changeAmt.toFixed(2)),
      changePct: Number(changePct.toFixed(2)),
      createdAt: data.created_at || data.updated_at || new Date().toISOString(),
      formatted: data.formatted || `$${data.price}`,
      unit: data.unit || 'barrel',
    };
  } catch (error) {
    console.warn(`[OilPriceAPI] Failed to fetch live price for ${code}:`, error);
    return null;
  }
}

export async function updateMarketRatesWithLiveApi(currentRates: MarketRate[]): Promise<{
  rates: MarketRate[];
  isLive: boolean;
  lastUpdatedTime: string;
}> {
  try {
    const [brentData, wtiData] = await Promise.all([
      fetchLivePrice('BRENT_CRUDE_USD'),
      fetchLivePrice('WTI_USD'),
    ]);

    let updatedAny = false;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const updatedRates = currentRates.map((item) => {
      if (item.symbol === 'BRENT' && brentData) {
        updatedAny = true;
        return {
          ...item,
          price: brentData.price,
          change: brentData.change,
          changePct: brentData.changePct,
          lastUpdated: 'Live OilPrice API',
        };
      }
      if (item.symbol === 'WTI' && wtiData) {
        updatedAny = true;
        return {
          ...item,
          price: wtiData.price,
          change: wtiData.change,
          changePct: wtiData.changePct,
          lastUpdated: 'Live OilPrice API',
        };
      }
      return item;
    });

    return {
      rates: updatedRates,
      isLive: updatedAny,
      lastUpdatedTime: timeStr,
    };
  } catch (err) {
    console.warn('[OilPriceAPI] Error updating market rates:', err);
    return {
      rates: currentRates,
      isLive: false,
      lastUpdatedTime: 'Offline',
    };
  }
}
