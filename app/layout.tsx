import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import {CarContextProvider} from '@/context/carContext';
import '@/public/fonts/fontstyle.css';
import './globals.css';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'AiFRED x Mitsubishi',
  description: 'Get your dream car',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <CarContextProvider>{children}</CarContextProvider>
      </body>
    </html>
  );
}
