'use client';

import SpinnerItem from './SpinnerItem';
import ScrollReveal from './ScrollReveal';
import { useState, useEffect } from 'react';
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

  const fetchSoldSpinners = async () => {
    try {
      console.log('Polling for sold spinners...');
      const response = await fetch('/api/sold-spinners');
      const data = await response.json();
      console.log('Received sold spinners:', data);
      if (JSON.stringify(data) !== JSON.stringify(soldSpinners)) {
        console.log('Updating sold spinners state');
        setSoldSpinners(data);
      }
    } catch (error) {
      console.error('Error fetching sold spinners:', error);
    }
  };

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
  }, []);

  // Log when soldSpinners state changes
  useEffect(() => {
    console.log('Current sold spinners:', soldSpinners);
  }, [soldSpinners]);

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {spinners.map((spinner, index) => (
          <ScrollReveal key={spinner.id} delay={index * 0.1}>
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