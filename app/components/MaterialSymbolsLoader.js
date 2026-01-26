"use client";

import { useEffect } from "react";

export default function MaterialSymbolsLoader() {
  useEffect(() => {
    // Charger les Material Symbols immédiatement
    const loadMaterialSymbols = () => {
      const links = [
        {
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
          id: "material-symbols-outlined"
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
          id: "material-symbols-sharp"
        }
      ];

      links.forEach(({ href, id }) => {
        // Vérifier si le lien n'existe pas déjà
        if (!document.getElementById(id)) {
          const link = document.createElement("link");
          link.id = id;
          link.rel = "stylesheet";
          link.href = href;
          link.crossOrigin = "anonymous";
          // Charger immédiatement sans délai
          link.media = "all";
          document.head.appendChild(link);
        }
      });
    };

    // Charger immédiatement
    if (typeof document !== 'undefined') {
      loadMaterialSymbols();
    }
  }, []);

  return null;
}

