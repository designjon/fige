import { NextResponse } from 'next/server';
import { resetSoldSpinners } from '@/app/lib/db';

export async function POST() {
  try {
    await resetSoldSpinners();
    return NextResponse.json({ message: 'Successfully reset sold spinners' });
  } catch (error) {
    console.error('Error resetting sold spinners:', error);
    return NextResponse.json(
      { error: 'Failed to reset sold spinners' },
      { status: 500 }
    );
  }
} 