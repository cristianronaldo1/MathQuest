  import localFont from "next/font/local";
  import "./globals.css";
  import SideNav from "./components/side-nav";

  const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });
  const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });

  export const metadata = {
    title: "MathQuest",
    description: "Final proyect",
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en-US">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex h-screen">
            <SideNav />
            <main className="w-[85%]">

              {children}
            </main>

          </div>
          
        </body>
      </html>
    );
  }
