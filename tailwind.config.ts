import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '6': '1.5rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '1rem',
      },
    },
  },
  plugins: [],
};

export default config; 