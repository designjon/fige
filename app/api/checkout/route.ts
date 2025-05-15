import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { isSpinnerSold } from '@/app/lib/db';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' as any,
});

// Server-side trusted product catalog
const PRODUCT_CATALOG: Record<string, { name: string; price: number }> = {
  '01': { name: 'Figé Spinner #01', price: 79900 },
  '02': { name: 'Figé Spinner #02', price: 69900 },
  '03': { name: 'Figé Spinner #03', price: 59900 },
  '04': { name: 'Figé Spinner #04', price: 49900 },
  '05': { name: 'Figé Spinner #05', price: 49900 },
};

export async function POST(request: Request) {
  try {
    console.log('Received checkout request');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { spinnerId, spinnerNumber } = body;

    // Validate spinnerNumber
    if (!spinnerNumber || !PRODUCT_CATALOG[spinnerNumber]) {
      console.error('Invalid spinner number:', spinnerNumber);
      return NextResponse.json(
        { error: 'Invalid spinner number' },
        { status: 400 }
      );
    }

    const product = PRODUCT_CATALOG[spinnerNumber];

    console.log('Environment variables:', {
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_KEY_SET: !!process.env.STRIPE_SECRET_KEY
    });

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set');
    }

    // Check if spinner is already sold
    console.log('Checking if spinner is sold:', spinnerNumber);
    const isSold = await isSpinnerSold(spinnerNumber);
    if (isSold) {
      console.log('Spinner already sold:', spinnerNumber);
      return NextResponse.json(
        { error: 'Spinner already sold' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');
    console.log('Base URL:', baseUrl);

    // Use the trusted price from the server-side catalog
    const unitAmount = product.price;
    console.log('Creating Stripe checkout session with unit amount:', unitAmount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: 'Limited Edition Figé Spinner',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}`,
      metadata: {
        spinnerId,
        spinnerNumber,
      },
      allow_promotion_codes: true,
    });

    if (!session.url) {
      console.error('No checkout URL in session:', session);
      throw new Error('No checkout URL returned from Stripe');
    }

    console.log('Checkout session created successfully');
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    // Log the full error object for debugging
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 