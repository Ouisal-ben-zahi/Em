"use client";

import { useEffect, useRef, useState } from "react";
import CloudRed from "./CloudRed";
import Image from "next/image";
import styles from "./faq.module.css";


const faq = [
  { q: "Achat à distance ?", a: "Oui. Nous accompagnons de nombreux clients à distance grâce aux visites en visio, à un suivi administratif complet et à des partenaires notariaux fiables." },
  { q: "Paiement comment ?", a: "Les paiements sont échelonnés selon l'avancement du chantier, conformément au contrat signé chez notaire." },
  { q: "Retards éventuels ?", a: "Nous sélectionnons des promoteurs sérieux et assurons un suivi de chantier régulier afin de limiter les risques et vous informer en toute transparence." },
];

export default function Faq() {
  const faqContentRef = useRef(null);
  const faqImageRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Vérifier que les refs sont disponibles
    if (!faqContentRef.current || !faqImageRef.current) {
      return;
    }

    const syncHeights = () => {
      if (faqContentRef.current && faqImageRef.current) {
        // Forcer un reflow pour obtenir la hauteur exacte
        void faqContentRef.current.offsetHeight;
        
        // Obtenir la hauteur réelle du contenu FAQ (header + questions)
        const contentHeight = faqContentRef.current.offsetHeight;
        
        // Appliquer la hauteur avec transition CSS
        // Même si toutes les questions sont fermées, on prend la hauteur minimale (header)
        faqImageRef.current.style.height = `${Math.max(contentHeight, 0)}px`;
      }
    };

    // Fonction pour synchroniser après un court délai (pour laisser les animations se terminer)
    const syncWithDelay = () => {
      // Utiliser requestAnimationFrame pour une meilleure performance
      requestAnimationFrame(() => {
        // Double RAF pour s'assurer que le DOM est mis à jour
        requestAnimationFrame(() => {
          setTimeout(() => {
            syncHeights();
          }, 100);
        });
      });
    };

    // Fonction pour synchroniser immédiatement (quand toutes les questions sont fermées)
    const syncImmediate = () => {
      requestAnimationFrame(() => {
        syncHeights();
      });
    };

    // Synchroniser au chargement initial
    const initTimeout = setTimeout(() => {
      syncHeights();
      setIsInitialized(true);
    }, 150);

    // Observer les changements de taille du contenu FAQ
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === faqContentRef.current) {
          syncWithDelay();
        }
      }
    });

    if (faqContentRef.current) {
      resizeObserver.observe(faqContentRef.current);
    }

    // Observer les changements d'état des détails (questions ouvertes/fermées)
    const detailsObserver = new MutationObserver((mutations) => {
      let shouldSync = false;
      let isClosing = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
          shouldSync = true;
          // Si l'attribut open est retiré, c'est une fermeture
          if (!mutation.target.hasAttribute('open')) {
            isClosing = true;
          }
        }
        if (mutation.type === 'childList') {
          shouldSync = true;
        }
      });
      
      if (shouldSync) {
        // Vérifier si toutes les questions sont fermées
        const allDetails = faqContentRef.current?.querySelectorAll('details');
        const allClosed = allDetails && Array.from(allDetails).every(detail => !detail.hasAttribute('open'));
        
        if (allClosed || isClosing) {
          // Synchroniser immédiatement quand on ferme ou que tout est fermé
          syncImmediate();
          // Puis resynchroniser plusieurs fois pour s'assurer que la hauteur est correcte
          setTimeout(() => syncHeights(), 150);
          setTimeout(() => syncHeights(), 300);
          setTimeout(() => syncHeights(), 450);
        } else {
          syncWithDelay();
        }
      }
    });

    if (faqContentRef.current) {
      const detailsElements = faqContentRef.current.querySelectorAll('details');
      detailsElements.forEach(detail => {
        detailsObserver.observe(detail, {
          attributes: true,
          attributeFilter: ['open'],
          childList: true,
          subtree: true
        });
      });
    }

    // Gérer le redimensionnement de la fenêtre avec debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        syncHeights();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Écouter les événements de transition sur les éléments details
    const handleTransitionEnd = (e) => {
      // Ne synchroniser que si la transition concerne la hauteur ou l'opacité
      if (e.propertyName === 'height' || e.propertyName === 'opacity' || e.propertyName === 'transform') {
        // Vérifier si toutes les questions sont fermées après la transition
        const allDetails = faqContentRef.current?.querySelectorAll('details');
        const allClosed = allDetails && Array.from(allDetails).every(detail => !detail.hasAttribute('open'));
        
        if (allClosed) {
          // Forcer la synchronisation immédiate si tout est fermé
          syncImmediate();
          setTimeout(() => syncHeights(), 100);
        } else {
          syncHeights();
        }
      }
    };

    // Écouter aussi les événements de fermeture directement sur les éléments details
    const handleToggle = (e) => {
      // Attendre que le DOM soit mis à jour
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const allDetails = faqContentRef.current?.querySelectorAll('details');
          const allClosed = allDetails && Array.from(allDetails).every(detail => !detail.hasAttribute('open'));
          
          if (allClosed) {
            syncImmediate();
            setTimeout(() => syncHeights(), 200);
          } else {
            syncWithDelay();
          }
        });
      });
    };

    if (faqContentRef.current) {
      const detailsElements = faqContentRef.current.querySelectorAll('details');
      detailsElements.forEach(detail => {
        detail.addEventListener('transitionend', handleTransitionEnd);
        // Écouter aussi l'événement toggle pour détecter l'ouverture/fermeture
        detail.addEventListener('toggle', handleToggle);
      });
    }

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      detailsObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      if (faqContentRef.current) {
        const detailsElements = faqContentRef.current.querySelectorAll('details');
        detailsElements.forEach(detail => {
          detail.removeEventListener('transitionend', handleTransitionEnd);
          detail.removeEventListener('toggle', handleToggle);
        });
      }
    };
  }, []);

  return (
    
        <section id="faq" className={`section ${styles.faqSection}`}>
          <div className="container">
            <div className={styles.faqGrid}>
              <div ref={faqContentRef} className={styles.faqContent}>
                <div className={styles.faqHeader}>
                  <h2 className={styles.faqTitle}>FAQ ANTI-OBJECTIONS</h2>
                  <p className={styles.faqIntro}>
                    Retrouvez ici les réponses aux questions les plus fréquentes sur l&apos;achat immobilier sur plan au
                    Maroc.
                  </p>
                </div>
                <div className={styles.faq}>
                  {faq.map((item, index) => (
                    <details key={item.q} className={styles.faqItem}>
                      <summary>
                        <span className={styles.faqQuestion}>{item.q}</span>
                        <span className={styles.faqToggle}>
                          <span className={styles.faqIconMinus}>−</span>
                          <span className={styles.faqIconPlus}>+</span>
                        </span>
                      </summary>
                      <div className={styles.faqAnswer}>
                        <p>{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
              <div ref={faqImageRef} className={styles.faqImage}>
                <div className={styles.faqFlagWrapper}>
                  <div className={styles.faqFlagFabric}>
                    <Image 
                      src="/drapeau.jpg"
                      alt="Drapeau du Maroc"
                      width={1200}
                      height={800}
                      quality={100}
                      unoptimized={true}
                      className={styles.faqFlagImage}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    
  );
}

