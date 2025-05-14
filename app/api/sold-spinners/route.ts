import { NextResponse } from 'next/server';
import { getSoldSpinners } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('Fetching sold spinners from API endpoint');
    const soldSpinners = await getSoldSpinners();
    console.log('Sold spinners from API:', soldSpinners);
    
    // Revalidate the home page
    revalidatePath('/');
    
    return new NextResponse(JSON.stringify(soldSpinners), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching sold spinners:', error);
    return new NextResponse(JSON.stringify([]), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  }
} 