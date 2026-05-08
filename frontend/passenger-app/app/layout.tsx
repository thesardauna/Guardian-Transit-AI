import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guardian Transit AI",
  description: "AI-powered transport safety platform"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
