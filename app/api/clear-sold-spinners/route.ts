import { resetSoldSpinners } from '@/app/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await resetSoldSpinners();
    return NextResponse.json({ success: true, message: 'Successfully cleared all sold spinners' });
  } catch (error) {
    console.error('Error clearing sold spinners:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear sold spinners' },
      { status: 500 }
    );
  }
} 