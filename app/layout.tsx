import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import 'primeicons/primeicons.css'

import Nav from './ui/Nav'
import Footer from './ui/Footer'
import { Providers } from './providers'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'HLAE中文站',
  description: 'CS等起源引擎游戏的影片制作工具HLAE的中文门户网站',
  icons: '/logo2009.svg',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-zinc-900 overflow-x-hidden`}>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
