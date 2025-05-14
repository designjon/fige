'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { playfair } from '../fonts';
import ScrollReveal from '../components/ScrollReveal';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setIsVerifying(false);
        return;
      }

      try {
        console.log('Verifying payment with session ID:', sessionId);
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();
        console.log('Verify payment response:', data);

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        if (data.email) {
          setCustomerEmail(data.email);
        }
        
        if (data.spinnerNumber) {
          console.log('Spinner marked as sold:', data.spinnerNumber);
        } else {
          console.error('No spinner number in response');
          setError('Failed to process order');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError(error instanceof Error ? error.message : 'Failed to verify payment');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[800px] w-full text-center px-4">
          <ScrollReveal>
            <h1 className={`text-5xl mb-8 ${playfair.className}`}>
              Something went wrong
            </h1>
            <p className="text-lg text-red-500 mb-8">{error}</p>
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

  if (isVerifying) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
        <div className="max-w-[800px] w-full text-center px-4">
          <ScrollReveal>
            <h1 className={`text-5xl mb-8 ${playfair.className}`}>
              Verifying your order...
            </h1>
          </ScrollReveal>
        </div>
      </main>
    );
  }

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