"use client";

import { useEffect } from "react";

export default function MaterialSymbolsLoader() {
  useEffect(() => {
    // Charger les Material Symbols de manière asynchrone
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
          link.media = "print";
          link.onload = function() {
            this.media = "all";
          };
          document.head.appendChild(link);
        }
      });
    };

    // Charger après un court délai pour ne pas bloquer le rendu initial
    const timeoutId = setTimeout(loadMaterialSymbols, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}

