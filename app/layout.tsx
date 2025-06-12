import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watch Party",
  description:
    "Create a watch party with your friends by creating schedule and movie selection.",
  openGraph: {
    title: "Watch Party",
    description: "Create a watch party with your friends!",
    url: "https://watch-party-invitation.vercel.app/",
    siteName: "Watch Party",
    images: [
      {
        url: "https://raw.githubusercontent.com/meraeugene/watch-party/refs/heads/main/public/thumbnail.png", // your preview image
        width: 1200,
        height: 630,
        alt: "Watch Party Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watch Party",
    description: "Create a watch party with your friends!",
    images: [
      "https://raw.githubusercontent.com/meraeugene/watch-party/refs/heads/main/public/thumbnail.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
