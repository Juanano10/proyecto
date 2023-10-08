import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inicio de sesion',
  description: 'Inicio de sesion autoreprac',
}

export default function RootLayout({
   children }) {
  return (
    <html lang="en">
      
      <body ><Providers>{children}</Providers></body>
    </html>
  )
}
