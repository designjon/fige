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
    console.log('Fetching sold spinners from Redis');
    const soldSpinners = await redis.get<string[]>(SOLD_SPINNERS_KEY);
    console.log('Current sold spinners:', soldSpinners);
    // Ensure we always return an array, even if Redis returns null
    return Array.isArray(soldSpinners) ? soldSpinners : [];
  } catch (error) {
    console.error('Error getting sold spinners:', error);
    return [];
  }
}

export async function markSpinnerAsSold(spinnerNumber: string): Promise<void> {
  try {
    console.log('Attempting to mark spinner as sold:', spinnerNumber);
    const soldSpinners = await getSoldSpinners();
    console.log('Current sold spinners before update:', soldSpinners);
    
    if (!soldSpinners.includes(spinnerNumber)) {
      const newSoldSpinners = [...soldSpinners, spinnerNumber];
      console.log('Updating Redis with new sold spinners:', newSoldSpinners);
      
      // Use transaction to ensure atomicity
      const pipeline = redis.pipeline();
      pipeline.del(SOLD_SPINNERS_KEY);
      pipeline.set(SOLD_SPINNERS_KEY, newSoldSpinners);
      await pipeline.exec();
      
      // Verify the update
      const updatedSpinners = await getSoldSpinners();
      if (!updatedSpinners.includes(spinnerNumber)) {
        throw new Error('Failed to verify spinner was marked as sold');
      }
      
      console.log('Successfully marked spinner as sold:', spinnerNumber);
    } else {
      console.log('Spinner already marked as sold:', spinnerNumber);
    }
  } catch (error) {
    console.error('Error marking spinner as sold:', error);
    throw new Error('Failed to mark spinner as sold');
  }
}

export async function isSpinnerSold(spinnerNumber: string): Promise<boolean> {
  try {
    console.log('Checking if spinner is sold:', spinnerNumber);
    const soldSpinners = await getSoldSpinners();
    const isSold = soldSpinners.includes(spinnerNumber);
    console.log('Spinner sold status:', { spinnerNumber, isSold });
    return isSold;
  } catch (error) {
    console.error('Error checking if spinner is sold:', error);
    return false;
  }
}

export async function resetSoldSpinners(): Promise<void> {
  try {
    console.log('Starting reset of sold spinners list');
    
    // Use pipeline to ensure atomicity
    const pipeline = redis.pipeline();
    pipeline.del(SOLD_SPINNERS_KEY);
    pipeline.set(SOLD_SPINNERS_KEY, []);
    await pipeline.exec();
    
    // Verify the reset
    const soldSpinners = await getSoldSpinners();
    console.log('Verification - current sold spinners after reset:', soldSpinners);
    
    // Double check the reset was successful
    if (soldSpinners.length > 0) {
      console.error('Reset verification failed - sold spinners list is not empty:', soldSpinners);
      throw new Error('Failed to reset sold spinners - verification failed');
    }
    
    console.log('Successfully reset sold spinners list');
  } catch (error) {
    console.error('Error resetting sold spinners:', error);
    throw error;
  }
} 