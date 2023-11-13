import { type AppType } from "next/app";
import { Poppins } from '@next/font/google'
import { api } from "~/utils/api";
import { NotificationProvider } from '~/context/NotificationContext';
import NextTopLoader from 'nextjs-toploader';
import { Analytics } from '@vercel/analytics/react';

import "~/styles/globals.css";
import NotificationAlert from "~/components/Notification";

const gothicFont = Poppins({
  subsets: ['latin', 'devanagari'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NotificationProvider>
      <NotificationAlert />
      <main className={`${gothicFont.variable} font-sans`}>
         <Analytics />
         <NextTopLoader color="#EF0107"/>
        <Component {...pageProps} />
      </main>
    </NotificationProvider>
  )
};

export default api.withTRPC(MyApp);
