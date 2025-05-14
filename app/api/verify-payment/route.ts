import { NextRequest, NextResponse } from 'next/server';
import { markSpinnerAsSold } from '@/app/lib/db';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();
    
    // Retrieve the session directly using the session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerEmail = session.customer_details?.email;
    const spinnerNumber = session.metadata?.spinnerNumber;

    if (spinnerNumber) {
      console.log('Marking spinner as sold:', spinnerNumber);
      await markSpinnerAsSold(spinnerNumber);
    }

    return NextResponse.json({ 
      spinnerNumber,
      email: customerEmail 
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Error verifying payment' },
      { status: 400 }
    );
  }
} 