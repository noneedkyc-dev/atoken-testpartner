import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://atoken.xyz"),
  title: "AToken — Agent-Driven Perp",
  description: "Unlock Every Agent Potential. AToken is an Agent-Driven Perp and AI-native financial infrastructure.",
  keywords: ["AToken","Agent-Driven Perp","AI Finance","Perp","Crypto"],
  openGraph: {
    title: "AToken — Agent-Driven Perp",
    description: "Unlock Every Agent Potential.",
    images: ["/assets/atoken-logo.png"]
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
