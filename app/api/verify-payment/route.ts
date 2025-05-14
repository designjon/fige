import { NextRequest, NextResponse } from 'next/server';
import { markSpinnerAsSold, getSoldSpinners } from '@/app/lib/db';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: NextRequest) {
  try {
    console.log('Verifying payment...');
    const { sessionId } = await req.json();
    console.log('Session ID:', sessionId);
    
    // Retrieve the session directly using the session ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('Retrieved session:', {
      id: session.id,
      status: session.status,
      metadata: session.metadata,
      customerEmail: session.customer_details?.email
    });

    const customerEmail = session.customer_details?.email;
    const spinnerNumber = session.metadata?.spinnerNumber;

    if (!spinnerNumber) {
      console.error('No spinner number in session metadata');
      return NextResponse.json(
        { error: 'No spinner number found' },
        { status: 400 }
      );
    }

    // Check if payment was successful
    if (session.payment_status !== 'paid') {
      console.error('Payment not completed:', session.payment_status);
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Check current state
    const currentSoldSpinners = await getSoldSpinners();
    console.log('Current sold spinners:', currentSoldSpinners);

    // If the spinner is already marked as sold, and this was a successful payment,
    // we can assume it was marked as sold by this same purchase
    if (currentSoldSpinners.includes(spinnerNumber)) {
      console.log('Spinner already marked as sold (expected):', spinnerNumber);
      return NextResponse.json({ 
        spinnerNumber,
        email: customerEmail,
        success: true
      });
    }

    // If not already sold, mark it as sold
    console.log('Marking spinner as sold:', spinnerNumber);
    await markSpinnerAsSold(spinnerNumber);

    // Verify the update
    const updatedSoldSpinners = await getSoldSpinners();
    console.log('Updated sold spinners after marking as sold:', updatedSoldSpinners);

    if (!updatedSoldSpinners.includes(spinnerNumber)) {
      console.error('Failed to mark spinner as sold - not found in updated list');
      return NextResponse.json(
        { error: 'Failed to mark spinner as sold' },
        { status: 500 }
      );
    }

    console.log('Successfully marked spinner as sold and verified');
    return NextResponse.json({ 
      spinnerNumber,
      email: customerEmail,
      success: true
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error verifying payment' },
      { status: 400 }
    );
  }
} 