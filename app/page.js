"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Apropos from "./components/Apropos";
import NosProjets from "./components/NosProjet";

// Charger les composants non critiques de manière asynchrone pour réduire le blocage du rendu
// Les CSS seront chargés uniquement quand le composant est rendu côté client
const Processus = dynamic(() => import("./components/processus"), {
  ssr: false, // CSS chargé de manière asynchrone côté client uniquement
  loading: () => <div style={{ minHeight: '200px' }} aria-label="Chargement..." />
});

const Formulaire = dynamic(() => import("./components/Formulaire"), {
  ssr: false, // CSS chargé de manière asynchrone côté client uniquement
  loading: () => <div style={{ minHeight: '200px' }} aria-label="Chargement..." />
});

const Faq = dynamic(() => import("./components/faq"), {
  ssr: false, // CSS chargé de manière asynchrone côté client uniquement
  loading: () => <div style={{ minHeight: '200px' }} aria-label="Chargement..." />
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

