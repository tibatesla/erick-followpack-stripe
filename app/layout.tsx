import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FollowPack Pro | Subscription",
  description: "Secure Checkout Experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      {/* Using system fonts: Inter, Roboto, or standard sans-serif */}
      <body className="bg-[#0f172a] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}