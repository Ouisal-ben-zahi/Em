"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PatternDecoratif from "./PatternDecoratif";
import styles from "./Apropos.module.css";

const aboutFirstPlanImg = "/imglanding/8.webp";
const patioImg = "/imglanding/11.webp";

function AboutFeaturesCarousel() {
    const slides = [
        { id: 1, text: "Promoteurs audités", icon: "file" },
        { id: 2, text: "Contrats contrôlés notaire", icon: "doc" },
        { id: 3, text: "Suivi des paiements", icon: "money" },
        { id: 4, text: "Rapport photo/vidéo", icon: "chart" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [noTransition, setNoTransition] = useState(false);
    const visible = 4;
    const step = 174; // largeur (150px) + gap (24px)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const next = prev + 1;
                // Quand on arrive à la fin d'une série complète, réinitialiser sans transition
                if (next >= slides.length * 2) {
                    setNoTransition(true);
                    setTimeout(() => {
                        setCurrentIndex(0);
                        setTimeout(() => {
                            setNoTransition(false);
                        }, 50);
                    }, 50);
                    return next;
                }
                return next;
            });
        }, 5000); // Change toutes les 5 secondes (plus lent)

        return () => clearInterval(interval);
    }, [slides.length]);

    const renderIcon = (name) => {
        if (name === "file") {
            return (
                <span className="material-symbols-sharp" style={{ 
                    fontSize: '48px', 
                    display: 'inline-block', 
                    width: '48px', 
                    height: '48px',
                    lineHeight: '1',
                    fontFamily: 'Material Symbols Sharp',
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                }}>
                    demography
                </span>
            );
        }
        if (name === "doc") {
            return (
                <span className="material-symbols-sharp" style={{ 
                    fontSize: '48px', 
                    display: 'inline-block', 
                    width: '48px', 
                    height: '48px',
                    lineHeight: '1',
                    fontFamily: 'Material Symbols Sharp',
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                }}>
                    contract
                </span>
            );
        }
        if (name === "money") {
            return (
                <span className="material-symbols-sharp" style={{ 
                    fontSize: '48px', 
                    display: 'inline-block', 
                    width: '48px', 
                    height: '48px',
                    lineHeight: '1',
                    fontFamily: 'Material Symbols Sharp',
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                }}>
                    paid
                </span>
            );
        }
        if (name === "chart") {
            return (
                <span className="material-symbols-sharp" style={{ 
                    fontSize: '48px', 
                    display: 'inline-block', 
                    width: '48px', 
                    height: '48px',
                    lineHeight: '1',
                    fontFamily: 'Material Symbols Sharp',
                    fontWeight: 'normal',
                    fontStyle: 'normal'
                }}>
                    finance_mode
                </span>
            );
        }
        if (name === "chat") {
            return (
                <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <line x1="9" y1="10" x2="15" y2="10"></line>
                    <line x1="12" y1="7" x2="12" y2="13"></line>
                </svg>
            );
        }
        return (
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="3" y1="9" x2="21" y2="9"></line>
            </svg>
        );
    };

    return (
        <div className={styles.aboutFeaturesCarousel}>
            <div className={styles.aboutFeaturesCarouselContainer}>
                <div className={styles.aboutFeaturesFadeLeft}></div>
                <div className={styles.aboutFeaturesFadeRight}></div>
                <div
                    className={`${styles.aboutFeaturesTrack} ${noTransition ? styles.noTransition : ''}`}
                    style={{
                        transform: `translateX(-${(currentIndex % (slides.length * 2)) * step}px)`
                    }}
                >
                    {slides.concat(slides, slides, slides).map((slide, index) => {
                        const normalizedIndex = currentIndex % (slides.length * 2);
                        const position = index - normalizedIndex;

                        // La carte est active si elle est dans la zone visible
                        const isActive = position >= 0 && position < visible;

                        // L'animation d'entrée se déclenche uniquement pour la carte qui vient d'entrer
                        const isEntering = position === visible - 1 && isActive;

                        return (
                            <div
                                key={`${slide.id}-${index}`}
                                className={`${styles.aboutFeatureCard} ${isActive ? styles.active : styles.inactive} ${isEntering ? styles.entering : ""}`}
                            >
                                <span className={styles.featureIcon}>{renderIcon(slide.icon)}</span>
                                <span className={styles.featureText}>{slide.text}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.aboutFeaturesProgress}>
                    <div
                        className={styles.aboutFeaturesProgressBar}
                        style={{
                            width: `${((currentIndex % (slides.length * 2)) / (slides.length * 2)) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// Fonction pour scroller vers le formulaire
const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

export default function Apropos() {


    return (

        <section id="a-propos" className={`section ${styles.aboutSection}`}>
            <div className={`container ${styles.aboutGrid}`}>
                <div className={styles.aboutLeft}>
                    <div className={styles.aboutStats}>
                        <div className={styles.aboutStat}>
                            <div className="stat-value" style={{fontSize: '20px' , fontWeight: '700'}}> 1200 <span style={{color: 'red',fontSize: '22px' , fontWeight: '700'}}>+</span> </div>
                            <div className="stat-label" style={{fontSize: '18px'}}>Construction</div>
                        </div>
                        <div className={styles.aboutStat}>
                            <div className="stat-value" style={{fontSize: '20px' , fontWeight: '700'}}>3250 <span style={{color: 'red',fontSize: '22px' , fontWeight: '700'}}>+</span> </div>
                            <div className="stat-label" style={{fontSize: '18px'}}>Clients satisfaits</div>
                        </div>
                    </div>
                    <div className={styles.aboutImages}>
                        <div className={styles.aboutImageWrapper}>
                            <Image src={aboutFirstPlanImg} alt="GOLD GARDEN" width={800} height={500} quality={85} sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                        <div className={`${styles.aboutImageWrapper} ${styles.aboutImageOverlap}`}>
                            <Image src={patioImg} alt="Résidence PATIO" width={800} height={500} quality={85} sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" style={{ width: "100%", height: "auto" }} />
                        </div>
                    </div>
                </div>
                <div className={styles.aboutRight}>
                    <div className={styles.aboutTag}>À propos</div>
                    <h2 className={styles.aboutTitle}>Pourquoi EM IMMO ?</h2>
                    <p className={styles.aboutDescription}>
                        Acheter sur plan est une opportunité — si c&apos;est sécurisé. <span style={{ whiteSpace: "nowrap" }}>EM IMMO encadre tout le processus pour vous.</span>
                    </p>
                    <AboutFeaturesCarousel />
                    <div className={styles.aboutCtaWrapper}>
                        <button className="cta secondary" onClick={scrollToForm}>
                            <span className="icon-square icon-square-white">
                                <span className="material-symbols-outlined" style={{ 
                                    fontSize: '24px', 
                                    display: 'inline-block', 
                                    width: '24px', 
                                    height: '24px',
                                    lineHeight: '1',
                                    fontFamily: 'Material Symbols Outlined',
                                    fontWeight: 'normal',
                                    fontStyle: 'normal'
                                }}>phone</span>
                            </span>
                            <span>Comprendre notre méthode</span>
                        </button>
                    </div>
                </div>
            </div>
            <PatternDecoratif />
        </section>

    );
}

