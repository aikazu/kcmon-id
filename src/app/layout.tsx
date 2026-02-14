import { Instrument_Serif, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: "italic",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "Iqbal Attila | kcmon.id",
  description: "Cybersecurity enthusiast with part-time full-stack development experience.",
  keywords: ["Iqbal Attila", "cybersecurity", "developer", "portfolio", "full-stack", "Jakarta"],
  authors: [{ name: "Iqbal Attila" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="id">
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
