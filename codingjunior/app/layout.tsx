import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dimension - Build smarter. Together.',
  description: 'The complete platform for modern development teams. Chat, code, cloud, deployments, and more.',
  keywords: 'collaboration, development, team, chat, code, deployment',
  authors: [{ name: 'Dimension Team' }],
  openGraph: {
    title: 'Dimension - Build smarter. Together.',
    description: 'The complete platform for modern development teams.',
    type: 'website',
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
