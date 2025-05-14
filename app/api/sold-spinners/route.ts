import { NextResponse } from 'next/server';
import { getSoldSpinners } from '@/app/lib/db';

export async function GET() {
  try {
    const soldSpinners = await getSoldSpinners();
    return NextResponse.json(soldSpinners);
  } catch (error) {
    console.error('Error fetching sold spinners:', error);
    return NextResponse.json([], { status: 500 });
  }
} 