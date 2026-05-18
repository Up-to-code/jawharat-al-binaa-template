import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sites.qentrah"),
  title: {
    default: "جوهرة البناء العقارية | Jawharat Al-Binaa Real Estate",
    template: "%s | جوهرة البناء العقارية",
  },
  description:
    "جوهرة البناء العقارية مؤسسة عقارية مرخصة في جدة للبيع والتطوير العقاري وفرص الأراضي والعقارات. Licensed real estate establishment in Jeddah.",
  applicationName: "جوهرة البناء العقارية",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "جوهرة البناء العقارية | Jawharat Al-Binaa Real Estate",
    description:
      "مؤسسة عقارية مرخصة في جدة للبيع والتطوير العقاري وفرص الأراضي والعقارات.",
    images: [
      {
        url: "/logo.png",
        width: 207,
        height: 209,
        alt: "Jawharat Al-Binaa Real Estate logo",
      },
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
        className={`${cairo.variable} antialiased`}
      >
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
