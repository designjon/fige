import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Figé Spinners | Limited Edition Collection',
  description: 'Limited edition collection of premium fidget spinners. Each piece is uniquely numbered and crafted with precision.',
  icons: {
    icon: [
      { url: '/F_Coin.png', type: 'image/png' },
    ],
    shortcut: '/F_Coin.png',
    apple: [
      { url: '/F_Coin.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/F_Coin.png" />
        <link rel="shortcut icon" href="/F_Coin.png" />
        <link rel="apple-touch-icon" href="/F_Coin.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
