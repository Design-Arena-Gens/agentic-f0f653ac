import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neon 2077 Monuments",
  description: "Cyberpunk 2077-style 3D interactive monuments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
