'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import ScrollReveal from '../components/ScrollReveal';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState<string>('');

  useEffect(() => {
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          const response = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId }),
          });

          if (response.ok) {
            const { spinnerNumber, email } = await response.json();
            if (email) {
              setCustomerEmail(email);
            }
            if (spinnerNumber) {
              // The markSpinnerAsSold operation will be handled by the API
              console.log('Spinner marked as sold:', spinnerNumber);
            }
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
      <div className="max-w-[800px] w-full text-center px-4">
        <ScrollReveal>
          <h1 className={`text-5xl mb-8 ${playfair.className}`}>
            Thank you for your order!
          </h1>
        </ScrollReveal>
        
        <ScrollReveal>
          <p className="text-lg text-gray-300 mb-16 leading-relaxed">
            Your limited-edition Figé spinner is reserved.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-lg text-gray-300 mb-16 leading-relaxed">
            A confirmation email has been sent to <span className="text-[#AB9768] font-bold">{customerEmail}</span> with your order details.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <Link
            href="/"
            className="border border-[#AB9768] text-[#AB9768] px-8 py-3 rounded-full hover:bg-[#AB9768] hover:text-black transition-all duration-300"
          >
            Return to Figé
          </Link>
        </ScrollReveal>
      </div>
    </main>
  );
} 