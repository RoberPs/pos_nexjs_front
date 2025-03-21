import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; //React Query disponible para todo el proyecto


const outfit = Outfit({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Pos-punto-de-venta",
  description: "App Pos con nestjs-nextjs",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
