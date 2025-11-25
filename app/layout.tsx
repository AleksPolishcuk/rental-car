import Header from "@/components/Header/Header";

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
