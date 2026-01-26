"use client";

import dynamic from "next/dynamic";

// Lazy load des composants non critiques pour réduire la taille initiale du bundle
const CloudRed = dynamic(() => import("./components/CloudRed"), {
  ssr: false,
});
const Hero = dynamic(() => import("./components/Hero"));
const Apropos = dynamic(() => import("./components/Apropos"));
const NosProjets = dynamic(() => import("./components/NosProjet"));
const PatternDecoratif = dynamic(() => import("./components/PatternDecoratif"), {
  ssr: false,
});

// Charger les composants non critiques de manière asynchrone pour réduire le blocage du rendu
// Les CSS seront chargés uniquement quand le composant est rendu côté client
const Processus = dynamic(() => import("./components/processus"), {
  ssr: true, // Activer SSR pour que la section s'affiche correctement
});

const Formulaire = dynamic(() => import("./components/Formulaire"), {
  ssr: false, // CSS chargé de manière asynchrone côté client uniquement
});

const Faq = dynamic(() => import("./components/faq"), {
  ssr: true, // Activer SSR pour que la section s'affiche correctement
});


export default function Page() {

  return (
    <div className="page">
      <Hero/>
      <Apropos/>
      <NosProjets />
      <Processus />
      <Formulaire />
      <Faq/>
    </div>
  );
}

