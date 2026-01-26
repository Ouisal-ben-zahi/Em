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
    // Attendre que les refs soient disponibles
    const checkRefs = () => {
      if (!faqContentRef.current || !faqImageRef.current) {
        // Réessayer après un court délai si les refs ne sont pas encore disponibles
        setTimeout(checkRefs, 100);
        return;
      }

      // Utiliser un flag pour éviter les lectures multiples dans la même frame
      let isSyncing = false;
      let pendingSync = false;

      const syncHeights = () => {
      if (isSyncing || !faqContentRef.current || !faqImageRef.current) {
        pendingSync = true;
        return;
      }

      isSyncing = true;
      
      // Utiliser requestAnimationFrame pour batch les lectures et écritures
      requestAnimationFrame(() => {
        if (!faqContentRef.current || !faqImageRef.current) {
          isSyncing = false;
          if (pendingSync) {
            pendingSync = false;
            syncHeights();
          }
          return;
        }

        // Lire toutes les propriétés géométriques en une seule fois
        const contentHeight = faqContentRef.current.offsetHeight;
        
        // Appliquer la hauteur avec transition CSS
        // Même si toutes les questions sont fermées, on prend la hauteur minimale (header)
        faqImageRef.current.style.height = `${Math.max(contentHeight, 0)}px`;
        
        isSyncing = false;
        
        // Si une synchronisation était en attente, la traiter maintenant
        if (pendingSync) {
          pendingSync = false;
          syncHeights();
        }
      });
    };

    // Fonction pour synchroniser après un court délai (pour laisser les animations se terminer)
    const syncWithDelay = () => {
      // Utiliser requestAnimationFrame pour batch les opérations
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Utiliser setTimeout pour laisser les transitions CSS se terminer
          setTimeout(() => {
            syncHeights();
          }, 100);
        });
      });
    };

    // Fonction pour synchroniser immédiatement (quand toutes les questions sont fermées)
    const syncImmediate = () => {
      // Utiliser requestAnimationFrame pour éviter les forced reflows
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
            // Resynchroniser une seule fois après un délai pour s'assurer que la hauteur est correcte
            setTimeout(() => syncHeights(), 200);
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
            // Synchroniser immédiatement si tout est fermé
            syncImmediate();
          } else {
            // Utiliser requestAnimationFrame pour éviter les forced reflows
            requestAnimationFrame(() => {
              syncHeights();
            });
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
    };

    checkRefs();
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
                    <details key={item.q} className={styles.faqItem} open={index === 0}>
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
                      src="/morocco (1) copy.webp"
                      alt="Drapeau du Maroc"
                      width={1200}
                      height={800}
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 80vw"
                      loading="lazy"
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

