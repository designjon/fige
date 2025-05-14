import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Redis environment variables are not set');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const SOLD_SPINNER_KEY_PREFIX = 'sold-spinner:';

export async function getSoldSpinners(): Promise<string[]> {
  try {
    console.log('Fetching sold spinners from Redis');
    // Get all keys matching the pattern
    const keys = await redis.keys(`${SOLD_SPINNER_KEY_PREFIX}*`);
    console.log('Found keys:', keys);
    
    if (!keys.length) {
      console.log('No sold spinners found');
      return [];
    }
    
    // Extract spinner numbers from keys
    const spinnerNumbers = keys.map(key => {
      const number = key.replace(SOLD_SPINNER_KEY_PREFIX, '');
      // Ensure two-digit format
      return number.padStart(2, '0');
    });
    
    console.log('Current sold spinners:', spinnerNumbers);
    return spinnerNumbers;
  } catch (error) {
    console.error('Error getting sold spinners:', error);
    return [];
  }
}

export async function markSpinnerAsSold(spinnerNumber: string): Promise<void> {
  try {
    // Ensure two-digit format
    const paddedNumber = spinnerNumber.padStart(2, '0');
    console.log('Attempting to mark spinner as sold:', paddedNumber);
    const key = `${SOLD_SPINNER_KEY_PREFIX}${paddedNumber}`;
    
    // Check if already sold
    const exists = await redis.exists(key);
    if (exists === 1) {
      console.log('Spinner already marked as sold:', paddedNumber);
      throw new Error('Spinner already sold');
    }
    
    // Set the key with a value of 1
    await redis.set(key, '1');
    console.log('Successfully marked spinner as sold:', paddedNumber);
  } catch (error) {
    console.error('Error marking spinner as sold:', error);
    throw error;
  }
}

export async function isSpinnerSold(spinnerNumber: string): Promise<boolean> {
  try {
    // Ensure two-digit format
    const paddedNumber = spinnerNumber.padStart(2, '0');
    console.log('Checking if spinner is sold:', paddedNumber);
    const key = `${SOLD_SPINNER_KEY_PREFIX}${paddedNumber}`;
    const exists = await redis.exists(key);
    const isSold = exists === 1;
    console.log('Spinner sold status:', { spinnerNumber: paddedNumber, isSold });
    return isSold;
  } catch (error) {
    console.error('Error checking if spinner is sold:', error);
    return false;
  }
}

export async function resetSoldSpinners(): Promise<void> {
  try {
    console.log('Starting reset of sold spinners list');
    
    // Get all keys matching the pattern
    const keys = await redis.keys(`${SOLD_SPINNER_KEY_PREFIX}*`);
    console.log('Found keys to delete:', keys);
    
    if (keys.length > 0) {
      // Delete all keys in a pipeline
      const pipeline = redis.pipeline();
      keys.forEach(key => pipeline.del(key));
      await pipeline.exec();
      
      // Verify the reset
      const remainingKeys = await redis.keys(`${SOLD_SPINNER_KEY_PREFIX}*`);
      if (remainingKeys.length > 0) {
        console.error('Reset verification failed - keys still exist:', remainingKeys);
        throw new Error('Failed to reset sold spinners - verification failed');
      }
    }
    
    console.log('Successfully reset sold spinners list');
  } catch (error) {
    console.error('Error resetting sold spinners:', error);
    throw error;
  }
} 