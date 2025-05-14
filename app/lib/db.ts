import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Redis environment variables are not set');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const SOLD_SPINNERS_KEY = 'soldSpinners';

export async function getSoldSpinners(): Promise<string[]> {
  try {
    const soldSpinners = await redis.get<string[]>(SOLD_SPINNERS_KEY);
    return soldSpinners || [];
  } catch (error) {
    console.error('Error getting sold spinners:', error);
    return [];
  }
}

export async function markSpinnerAsSold(spinnerNumber: string): Promise<void> {
  try {
    const soldSpinners = await getSoldSpinners();
    if (!soldSpinners.includes(spinnerNumber)) {
      await redis.set(SOLD_SPINNERS_KEY, [...soldSpinners, spinnerNumber]);
    }
  } catch (error) {
    console.error('Error marking spinner as sold:', error);
    throw new Error('Failed to mark spinner as sold');
  }
}

export async function isSpinnerSold(spinnerNumber: string): Promise<boolean> {
  const soldSpinners = await getSoldSpinners();
  return soldSpinners.includes(spinnerNumber);
} 