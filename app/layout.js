import "./globals.css";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";

// Charger Header et Footer de manière lazy pour réduire le bundle initial
// SSR activé car ils sont critiques pour le SEO et l'accessibilité
const Header = dynamic(() => import("./components/Header"), {
  ssr: true
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: true
});

const MaterialSymbolsLoader = dynamic(() => import("./components/MaterialSymbolsLoader"), {
  ssr: false // Pas besoin de SSR pour le chargement asynchrone des polices
});

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="dns-prefetch" href="https://c.animaapp.com" />
        {/* Preconnect pour Material Symbols (chargés de manière asynchrone) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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


