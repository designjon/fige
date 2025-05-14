'use client';

import SpinnerItem from './SpinnerItem';
import ScrollReveal from './ScrollReveal';
import { useState, useEffect, useCallback } from 'react';
import { playfair } from '../fonts';

const spinners = [
  {
    id: 1,
    number: '01',
    image: '/01.png',
    price: 500,
  },
  {
    id: 2,
    number: '02',
    image: '/02.png',
    price: 500,
  },
  {
    id: 3,
    number: '03',
    image: '/03.png',
    price: 500,
  },
  {
    id: 4,
    number: '04',
    image: '/04.png',
    price: 500,
  },
  {
    id: 5,
    number: '05',
    image: '/05.png',
    price: 500,
  },
];

const POLLING_INTERVAL = 500; // Poll every half second for more responsive updates

export default function SpinnerGrid() {
  const [soldSpinners, setSoldSpinners] = useState<string[]>([]);
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const fetchSoldSpinners = useCallback(async () => {
    try {
      // Construct the URL using window.location to ensure correct protocol and host
      const baseUrl = window.location.origin;
      const url = new URL('/api/sold-spinners', baseUrl);
      
      const response = await fetch(url.toString(), {
        next: { revalidate: 0 },
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch sold spinners');
      }
      
      const data = await response.json();
      
      // Only update state if the data has actually changed
      setSoldSpinners(prevSpinners => {
        if (JSON.stringify(data) !== JSON.stringify(prevSpinners)) {
          setForceUpdateKey(prev => prev + 1);
          return data;
        }
        return prevSpinners;
      });
    } catch (error) {
      console.error('Error fetching sold spinners:', error);
    }
  }, []); // Remove soldSpinners from dependency array

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial fetch
    fetchSoldSpinners();

    // Set up polling
    const intervalId = setInterval(fetchSoldSpinners, POLLING_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [fetchSoldSpinners]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {spinners.map((spinner, index) => (
          <ScrollReveal key={`${spinner.id}-${forceUpdateKey}`} delay={index * 0.1}>
            <SpinnerItem
              spinner={spinner}
              isSold={soldSpinners.includes(spinner.number)}
            />
          </ScrollReveal>
        ))}
      </div>
      <p className="text-center text-gray-400 text-sm mt-12">
        Units are strictly limited. Pre-order now to guarantee your place in this exclusive release.
      </p>
    </div>
  );
} 