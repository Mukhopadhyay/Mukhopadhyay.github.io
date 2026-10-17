import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import MotionProvider from "../components/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pranesh Mukhopadhyay — Backend & applied ML engineer",
    template: "%s · Pranesh Mukhopadhyay",
  },
  description:
    "Backend and applied ML engineer in Mumbai. Production Python services, real-time systems and ML-powered APIs.",
};

// Sets the theme class before first paint so there is no light/dark flash.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <MotionProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
          >
            Skip to content
          </a>
          <Nav />
          <main
            id="content"
            className="mx-auto w-full max-w-[46rem] px-5 pb-24 pt-10 sm:pt-16"
          >
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </MotionProvider>
      </body>
    </html>
  );
}
