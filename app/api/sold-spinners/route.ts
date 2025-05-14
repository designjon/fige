import { NextResponse } from 'next/server';
import { getSoldSpinners } from '@/app/lib/db';

export async function GET() {
  try {
    console.log('Fetching sold spinners from API endpoint');
    const soldSpinners = await getSoldSpinners();
    console.log('Sold spinners from API:', soldSpinners);
    return NextResponse.json(soldSpinners);
  } catch (error) {
    console.error('Error fetching sold spinners:', error);
    return NextResponse.json([], { status: 500 });
  }
} 