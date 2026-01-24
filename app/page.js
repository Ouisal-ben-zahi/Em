"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import emailjs from '@emailjs/browser';
import { supabase } from "../lib/supabase";
// Images servies depuis le dossier public de Next.js

import zoomOutMapIcon from "./icons/zoom_out_map_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";
import downloadIcon from "./icons/download_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";

import CloudRed from "./components/CloudRed"
import Hero from "./components/Hero";
import Apropos from "./components/Apropos";
import NosProjets from "./components/NosProjet";
import PatternDecoratif from "./components/PatternDecoratif";

// Charger les composants non critiques de manière asynchrone pour réduire le blocage du rendu
const Processus = dynamic(() => import("./components/processus"), {
  loading: () => <div style={{ minHeight: '200px' }} />,
  ssr: true
});

const Formulaire = dynamic(() => import("./components/Formulaire"), {
  loading: () => <div style={{ minHeight: '200px' }} />,
  ssr: true
});

const Faq = dynamic(() => import("./components/faq"), {
  loading: () => <div style={{ minHeight: '200px' }} />,
  ssr: true
});


const stats = [
  { label: "Projets réalisés", value: "+10" },
  { label: "Clients satisfaits", value: "+500" },
  { label: "Promoteurs audités", value: "100%" },
  { label: "Contrats notaire", value: "Contrôlés" },
];

const trust = [
  "Paiements par avancement chantier",
  "Rapport photo / vidéo mensuel",
  "Accompagnement jusqu’aux clés",
  "Projets sélectionnés, paiements progressifs, suivi chantier et accompagnement complet jusqu’à la remise des clés.",
];



export default function Page() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const scrollTimeoutRef = useRef(null);
  const lastChangeRef = useRef({ time: 0, index: 0, direction: 0 }); // direction: 1 bas, -1 haut
    const projectsCarouselRef = useRef(null);

  

  const scrollAccumRef = useRef(0);
  const scrollDirRef = useRef(0);
  const isChangingRef = useRef(false); // Flag pour bloquer pendant le changement
  const dragStartRef = useRef({ x: 0, y: 0, isDragging: false });

  // Image gauche (projet 1) liée au texte droite (projet 1)
  // Image droite (projet 0) liée au texte gauche (projet 0)
  // Donc : scroll gauche change les deux indices de manière synchronisée
  // scroll droite change les deux indices de manière synchronisée
  
  const handleCarouselScroll = (e) => {
    // Les événements sont maintenant attachés directement au track interne
    // donc on est sûr d'être sur le carrousel
    const carousel = projectsCarouselRef.current;
    if (!carousel) return;
    // Bloquer systématiquement le scroll de page quand on est sur le carrousel
    e.preventDefault();
    e.stopPropagation();
    
    // Support pour le scroll (pavé tactile, trackpad)
    const deltaX = e.deltaX || 0;
    const deltaY = e.deltaY || 0;
    
    // Bloquer complètement si changement en cours ou cooldown actif
    if (isChangingRef.current || scrollTimeoutRef.current !== null) {
      scrollAccumRef.current = 0;
      scrollDirRef.current = 0;
      return;
    }

    // Détecter le scroll vertical dominant
    if (Math.abs(deltaY) >= Math.abs(deltaX) && Math.abs(deltaY) > 0) {
      e.preventDefault();
      e.stopPropagation();

      const sign = deltaY > 0 ? 1 : -1; // 1 = bas, -1 = haut
      const now = Date.now();
      
      // Vérifier qu'on ne change pas trop vite (même direction ou direction différente)
      if (now - lastChangeRef.current.time < 700) {
        // Bloquer complètement pendant 700ms après le dernier changement
        scrollAccumRef.current = 0;
        scrollDirRef.current = 0;
        return;
      }
      
      // Si changement de direction, réinitialiser l'accumulation
      if (scrollDirRef.current !== 0 && scrollDirRef.current !== sign) {
        scrollAccumRef.current = 0;
      }
      
      scrollDirRef.current = sign;
      scrollAccumRef.current += Math.abs(deltaY);
      
      const threshold = 150; // seuil minimum avant changement (augmenté pour éviter les longs gestes)
      if (scrollAccumRef.current < threshold) return;
      
      // Inverser la logique : geste vers le haut → slide vient du bas (index décrémente)
      // geste vers le bas → slide vient du haut (index incrémente)
      const delta = sign > 0 ? 1 : -1; // bas (sign=1) → index++, haut (sign=-1) → index--

      // Marquer qu'un changement est en cours IMMÉDIATEMENT
      isChangingRef.current = true;
      
      // Mettre le cooldown IMMÉDIATEMENT pour bloquer les événements suivants
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
        isChangingRef.current = false;
      }, 700);

      // Réinitialiser l'accumulation et la direction AVANT le changement
      scrollAccumRef.current = 0;
      scrollDirRef.current = 0;

      setCurrentProjectIndex((prevIndex) => {
        // Boucle infinie dans les deux sens avec modulo
        let newIndex;
        if (delta > 0) {
          // Aller vers le bas (slide suivante, index++)
          newIndex = (prevIndex + 1) % projects.length;
        } else {
          // Aller vers le haut (slide précédente, index--)
          newIndex = (prevIndex - 1 + projects.length) % projects.length;
        }
        
        // Toujours mettre à jour pour permettre le bouclage infini
        // sign > 0 = geste vers le bas, sign < 0 = geste vers le haut
        lastChangeRef.current = { time: Date.now(), index: newIndex, direction: sign };
        
        // Mettre à jour prevIndex de manière synchrone pour que l'animation fonctionne même lors du bouclage
        setPrevIndex(prevIndex);
        
        return newIndex;
      });
    }
  };

  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY, isDragging: true, startIndex: currentProjectIndex };
  };

  const handleDragMove = (e) => {
    if (!dragStartRef.current.isDragging) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    // Seuil pour déclencher le changement de slide (vertical swipe uniquement)
    // Priorité au mouvement vertical
    if (scrollTimeoutRef.current !== null) return;

    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
    e.preventDefault();
    e.stopPropagation();
    
      const sign = deltaY > 0 ? 1 : -1;
      const now = Date.now();
      
      // Vérifier qu'on ne change pas trop vite OU dans une direction différente
      if (now - lastChangeRef.current.time < 500) {
        if (lastChangeRef.current.direction !== sign) {
          // Changement de direction trop rapide, ignorer
          return;
        }
        // Si même direction mais trop rapide, bloquer aussi
        if (lastChangeRef.current.direction === sign) {
          return;
        }
      }
      
      // Inverser la logique : geste vers le haut → slide vient du bas (index décrémente)
      // geste vers le bas → slide vient du haut (index incrémente)
      const delta = deltaY > 0 ? 1 : -1; // bas (deltaY>0) → index++, haut (deltaY<0) → index--
      const startIndex = dragStartRef.current.startIndex;
      
      // Boucle infinie dans les deux sens avec modulo
      let newIndex;
      if (delta > 0) {
        // Aller vers le bas (slide suivante, index++)
        newIndex = (startIndex + 1) % projects.length;
      } else {
        // Aller vers le haut (slide précédente, index--)
        newIndex = (startIndex - 1 + projects.length) % projects.length;
      }
    
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 500);
      
      // Toujours mettre à jour prevIndex AVANT de mettre à jour lastChangeRef
      // pour que l'animation fonctionne même lors du bouclage
      setPrevIndex(startIndex);
      
      // S'assurer que la direction est bien enregistrée pour l'animation
      // sign > 0 = geste vers le bas, sign < 0 = geste vers le haut
      lastChangeRef.current = { time: Date.now(), index: newIndex, direction: sign };
      setCurrentProjectIndex(newIndex);
      dragStartRef.current.isDragging = false;
      dragStartRef.current.x = clientX;
      dragStartRef.current.y = clientY;
    }
  };

  const handleDragEnd = () => {
    dragStartRef.current.isDragging = false;
  };

  useEffect(() => {
    const carousel = projectsCarouselRef.current;

    const wheelHandler = (e) => handleCarouselScroll(e);
    const touchStart = (e) => {
      e.stopPropagation();
      handleDragStart(e);
    };
    const mouseStart = (e) => {
      e.stopPropagation();
      handleDragStart(e);
    };
    
    const touchMove = (e) => {
      if (dragStartRef.current.isDragging) {
        handleDragMove(e);
      }
    };
    const mouseMove = (e) => {
      if (dragStartRef.current.isDragging) {
        handleDragMove(e);
      }
    };
    const touchEnd = () => {
      handleDragEnd();
    };
    const mouseUp = () => {
      handleDragEnd();
    };

    if (carousel) {
      // Trouver le track interne et attacher les événements directement dessus
      const track = carousel.querySelector('.projects-horizontal-track');
      if (track) {
        // Écouter les événements uniquement sur le track interne (pas sur le conteneur externe)
        track.addEventListener('wheel', wheelHandler, { passive: false });
        track.addEventListener('touchstart', touchStart, { passive: false });
        track.addEventListener('mousedown', mouseStart, { passive: false });
      } else {
        // Fallback sur le carrousel si le track n'est pas trouvé
        carousel.addEventListener('wheel', wheelHandler, { passive: false });
        carousel.addEventListener('touchstart', touchStart, { passive: false });
        carousel.addEventListener('mousedown', mouseStart, { passive: false });
      }
    }
    
    window.addEventListener('touchmove', touchMove, { passive: false });
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      if (carousel) {
        const track = carousel.querySelector('.projects-horizontal-track');
        if (track) {
          track.removeEventListener('wheel', wheelHandler);
          track.removeEventListener('touchstart', touchStart);
          track.removeEventListener('mousedown', mouseStart);
        } else {
          carousel.removeEventListener('wheel', wheelHandler);
          carousel.removeEventListener('touchstart', touchStart);
          carousel.removeEventListener('mousedown', mouseStart);
      }
      }
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const nextProject = () => {
    setCurrentProjectIndex((prev) => {
      setPrevIndex(prev);
      return (prev + 1) % projects.length;
    });
  };

  const prevProject = () => {
    setCurrentProjectIndex((prev) => {
      setPrevIndex(prev);
      return (prev - 1 + projects.length) % projects.length;
    });
  };

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

