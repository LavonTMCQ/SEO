import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from './components/SessionProvider'
import TRPCProvider from './components/TRPCProvider'

export const metadata: Metadata = {
  title: 'SEO Pro - Advanced SEO Analytics Platform',
  description: 'Professional SEO tools for keyword research, rank tracking, and site optimization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TRPCProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </TRPCProvider>
      </body>
    </html>
  )
}
