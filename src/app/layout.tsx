import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-body",
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kcmon.id"),
  title: "Iqbal Attila | kcmon.id",
  description:
    "Secure by Design, Ship with Intent. Cybersecurity enthusiast and part-time full-stack engineer based in Jakarta.",
  keywords: ["Iqbal Attila", "cybersecurity", "developer", "portfolio", "full-stack", "Jakarta"],
  authors: [{ name: "Iqbal Attila" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Iqbal Attila | kcmon.id",
    description:
      "Secure by Design, Ship with Intent. Cybersecurity enthusiast and part-time full-stack engineer based in Jakarta.",
    url: "https://kcmon.id",
    siteName: "kcmon.id",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Iqbal Attila | kcmon.id",
    description:
      "Secure by Design, Ship with Intent. Cybersecurity enthusiast and part-time full-stack engineer based in Jakarta.",
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
        className={`${bricolage.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
