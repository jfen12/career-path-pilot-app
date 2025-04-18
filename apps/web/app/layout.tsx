import { MainLayout } from '@/components/layout/main-layout'
import './globals.css'

export const metadata = {
  title: 'TalentPrimer',
  description: 'Career Path Pilot App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
} 