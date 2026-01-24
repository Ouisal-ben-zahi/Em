import "./globals.css";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MaterialSymbolsLoader from "./components/MaterialSymbolsLoader";

// Réduire le nombre de poids pour optimiser la taille des polices
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], // Réduit de 5 à 4 poids
  display: "swap",
  preload: true,
  adjustFontFallback: true
});
const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], // Réduit de 6 à 4 poids
  variable: "--font-plus-jakarta-sans", 
  display: "swap",
  preload: false, // Pas de preload car c'est une variable font
  adjustFontFallback: true
});

export const metadata = {
  title: "EM IMMO | Entrepreneurs Morocco Immobilier",
  description: "Achat sur plan à Marrakech en toute confiance avec EM IMMO.",
  icons: {
    icon: '/logos/brand-icon-1.png',
    apple: '/logos/brand-icon-1.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Export viewport séparé (nouvelle API Next.js)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#df1f26',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://c.animaapp.com" />
        {/* Preconnect pour Material Symbols (chargés de manière asynchrone) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload critical resources */}
        <link rel="preload" href="/logos/brand-icon-1.png" as="image" type="image/png" />
        {/* Resource hints pour optimiser le chargement des CSS critiques */}
        <link rel="preconnect" href="/" />
      </head>
      <body className={`${montserrat.className} ${plusJakartaSans.variable}`}>
        <MaterialSymbolsLoader />
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}


