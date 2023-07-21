import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yet Another Chess Site",
  description: "Created by Jeet and Shubhang",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
          <h1 className="text-4xl font-bold text-white">YACS</h1>
          <h2 className="mt-2 text-lg text-gray-400">Yet Another Chess Site</h2>
          {children}
        </div>
      </body>
    </html>
  );
}
