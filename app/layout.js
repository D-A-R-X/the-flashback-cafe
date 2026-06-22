import { Fraunces, Newsreader, JetBrains_Mono, Anton } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
  weight: "400",
});

export const metadata = {
  title: "The FlashBack Cafe — Chennai · since the good days",
  description:
    "A nostalgic cafe in Anna Nagar, Chennai. Slow coffee, loud records, fast friendships.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4ebd2",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} ${anton.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
