import type { Metadata } from "next";
import Script from "next/script";
import { Instrument_Serif, JetBrains_Mono, Outfit } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Iqbal Attila | kcmon.id",
  description: "Cybersecurity enthusiast with part-time full-stack development experience.",
  keywords: ["Iqbal Attila", "cybersecurity", "developer", "portfolio", "full-stack", "Jakarta"],
  authors: [{ name: "Iqbal Attila" }],
  icons: {
    icon: "/favicon.svg",
  },
};

const themeScript = `
  (() => {
    const storageKey = "kcmon-theme";
    const fallbackTheme = "dark";
    const storedTheme = window.localStorage.getItem(storageKey);
    const nextTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : fallbackTheme;

    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
