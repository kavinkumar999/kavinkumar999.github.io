import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./styles/globals.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kavin Kumar",
  description: "Personal portfolio of Kavin Kumar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
              {children}
            </main>
          </ThemeProvider>
      </body>
    </html>
  );
}
