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

const POLLING_INTERVAL = 2000; // Check every 2 seconds

export default function SpinnerGrid() {
  const [soldSpinners, setSoldSpinners] = useState<string[]>([]);
  const [forceUpdateKey, setForceUpdateKey] = useState(0);

  const fetchSoldSpinners = useCallback(async () => {
    try {
      console.log('Polling for sold spinners...');
      const timestamp = Date.now();
      // Use relative URL to ensure it hits the correct environment
      const response = await fetch(`/api/sold-spinners?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
      
      if (!response.ok) {
        console.error('Failed to fetch sold spinners:', response.status, response.statusText);
        throw new Error('Failed to fetch sold spinners');
      }
      
      const data = await response.json();
      console.log('Received sold spinners:', data);
      
      // Only update state if the data has actually changed
      if (JSON.stringify(data) !== JSON.stringify(soldSpinners)) {
        console.log('Updating sold spinners state due to change');
        setSoldSpinners(data);
        setForceUpdateKey(prev => prev + 1); // Only update key when data changes
      }
    } catch (error) {
      console.error('Error fetching sold spinners:', error);
    }
  }, [soldSpinners]);

  useEffect(() => {
    console.log('Setting up polling...');
    // Initial fetch
    fetchSoldSpinners();

    // Set up polling
    const intervalId = setInterval(fetchSoldSpinners, POLLING_INTERVAL);

    // Cleanup interval on unmount
    return () => {
      console.log('Cleaning up polling interval');
      clearInterval(intervalId);
    };
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