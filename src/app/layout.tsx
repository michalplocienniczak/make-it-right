import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import AuthProvider from '@/auth/Provider'
import { ConfigProvider } from 'antd'
import Navbar from '@/components/Navbar/Navbar'
import mainStyles from '@/components/Main.module.scss'
import QueryClientProvider from '@@/QueryClientProvider'

const myFont = localFont({
  src: './Minecraftia.woff',
  display: 'swap',
  variable: '--font',
})

export const metadata: Metadata = {
  title: 'Steventory',
  description: 'Where Every Steve Finds Their Treasure!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <QueryClientProvider>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: myFont.style.fontFamily,
                borderRadius: 0,
              },
            }}
          >
            <AuthProvider>
              <Navbar />
              <main className={mainStyles.main}>{children}</main>
            </AuthProvider>
          </ConfigProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
