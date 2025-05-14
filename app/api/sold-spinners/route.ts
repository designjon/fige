import { NextResponse } from 'next/server';
import { getSoldSpinners } from '@/app/lib/db';

export async function GET() {
  try {
    console.log('Fetching sold spinners from API endpoint');
    const soldSpinners = await getSoldSpinners();
    console.log('Sold spinners from API:', soldSpinners);
    
    // Return response with no-cache headers
    return new NextResponse(JSON.stringify(soldSpinners), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching sold spinners:', error);
    return new NextResponse(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }
} 