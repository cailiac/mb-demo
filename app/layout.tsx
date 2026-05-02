import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mercedes Basutto — Travel Counsellor Dubai',
  description: 'Personalised travel planning for honeymoons, family holidays and special occasions.',
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
