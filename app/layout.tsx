import './globals.css';
import {Manrope, Inter} from "next/font/google";
import Header from "@/components/Header/Header";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', ],
  variable: '--font-manrope',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ua" >
      <body>
        
            <Header />
            <main>
              {children}
            </main>
      </body>
    </html>
  );
}
