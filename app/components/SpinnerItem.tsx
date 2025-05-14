'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  spinner: {
    id: number;
    number: string;
    image: string;
    price: number;
  };
  isSold: boolean;
}

export default function SpinnerItem({ spinner, isSold: initialIsSold }: SpinnerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSold, setIsSold] = useState(initialIsSold);

  useEffect(() => {
    setIsSold(initialIsSold);
  }, [initialIsSold]);

  const handlePreOrder = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spinnerId: spinner.id,
          spinnerNumber: spinner.number,
          price: spinner.price,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Spinner already sold') {
          setIsSold(true);
        }
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      if (!url) {
        throw new Error('No checkout URL returned');
      }

      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(error instanceof Error ? error.message : 'Failed to process pre-order');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col items-center p-6 bg-[#1a1f24] rounded-2xl border border-[#2a2f34] min-h-[320px]">
        <div className="relative">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={spinner.image}
              alt={`Figé Spinner #${spinner.number}`}
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className="object-contain"
              priority
            />
          </div>

          <h3 className="text-[#AB9768] text-xl font-medium mb-2 text-center">
            Figé #{spinner.number}
          </h3>

          {isSold && (
            <div className="absolute -inset-x-4 -inset-y-4 translate-y-2 backdrop-blur-sm rounded-3xl" />
          )}
        </div>
        
        <div className="mt-auto">
          {isSold ? (
            <p className="w-full text-[#AB9768] text-lg font-medium text-center mb-[42px]">
              Sold
            </p>
          ) : (
            <>
              <p className="text-white font-medium mb-4">${spinner.price}</p>
              {error && !isSold && (
                <p className="text-red-500 text-sm mb-2">{error}</p>
              )}
              <button
                onClick={handlePreOrder}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-full border border-[#AB9768] text-[#AB9768] text-sm font-medium 
                  transition-all duration-300 hover:bg-[#AB9768] hover:text-black disabled:opacity-50 
                  disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#AB9768]"
              >
                {isLoading ? 'Loading...' : 'Pre-Order'}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
} 