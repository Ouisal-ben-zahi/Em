"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CloudRed from "../components/CloudRed";
import { supabase } from "../../lib/supabase";
import "./style.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";
const aboutFirstPlanImg = "/imglanding/8.png";
const patioImg = "/imglanding/11.png";

function AboutFeaturesCarousel() {
  const slides = [
    { id: 1, text: "Promoteurs audités", icon: "file" },
    { id: 2, text: "Contrats contrôlés notaire", icon: "doc" },
    { id: 3, text: "Paiements par avancement chantier", icon: "money" },
    { id: 4, text: "Rapport photo/vidéo mensuel", icon: "chart" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const visible = 4;
  const step = 174;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
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
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const renderIcon = (name) => {
    if (name === "file") {
      return (
        <span className="material-symbols-sharp" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
          demography
        </span>
      );
    }
    if (name === "doc") {
      return (
        <span className="material-symbols-sharp" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
          contract
        </span>
      );
    }
    if (name === "money") {
      return (
        <span className="material-symbols-sharp" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
          paid
        </span>
      );
    }
    if (name === "chart") {
      return (
        <span className="material-symbols-sharp" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
          finance_mode
        </span>
      );
    }
    return null;
  };

  return (
    <div className="about-features-carousel">
      <div className="about-features-carousel-container">
        <div className="about-features-fade-left"></div>
        <div className="about-features-fade-right"></div>
        <div
          className={`about-features-track ${noTransition ? 'no-transition' : ''}`}
          style={{ 
            transform: `translateX(-${(currentIndex % (slides.length * 2)) * step}px)`
          }}
        >
          {slides.concat(slides, slides, slides).map((slide, index) => {
            const normalizedIndex = currentIndex % (slides.length * 2);
            const position = index - normalizedIndex;
            const isActive = position >= 0 && position < visible;
            const isEntering = position === visible - 1 && isActive;

            return (
              <div
                key={`${slide.id}-${index}`}
                className={`about-feature-card ${isActive ? "active" : "inactive"} ${isEntering ? "entering" : ""}`}
              >
                <span className="feature-icon">{renderIcon(slide.icon)}</span>
                <span className="feature-text">{slide.text}</span>
              </div>
            );
          })}
        </div>
        <div className="about-features-progress">
          <div
            className="about-features-progress-bar"
            style={{
              width: `${((currentIndex % (slides.length * 2)) / (slides.length * 2)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: null, message: '' });

  // Fonction pour rediriger vers le formulaire de la page d'accueil
  const scrollToForm = () => {
    window.location.href = '/#contact-form';
  };

  // Fonction pour gérer l'inscription à la newsletter
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus({ 
        type: 'error', 
        message: 'Veuillez saisir une adresse email valide.' 
      });
      return;
    }

    try {
      // Enregistrer dans Supabase
      if (supabase) {
        const { error: supabaseError } = await supabase
          .from('newsletter')
          .insert([
            {
              email: newsletterEmail
            }
          ]);

        if (supabaseError) {
          console.error('Erreur Supabase:', supabaseError);
          setNewsletterStatus({ 
            type: 'error', 
            message: 'Une erreur est survenue. Veuillez réessayer.' 
          });
        } else {
          setNewsletterStatus({ 
            type: 'success', 
            message: 'Merci ! Votre email a été enregistré avec succès.' 
          });
          setNewsletterEmail('');
          // Réinitialiser le message après 3 secondes
          setTimeout(() => {
            setNewsletterStatus({ type: null, message: '' });
          }, 3000);
        }
      } else {
        console.warn('Supabase non configuré');
        setNewsletterStatus({ 
          type: 'error', 
          message: 'Veuillez réessayer plus tard.' 
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setNewsletterStatus({ 
        type: 'error', 
        message: 'Une erreur est survenue. Veuillez réessayer.' 
      });
    }
  };

  return (
    <div className="services-page">
      <main className="services-main" style={{ background: "#000000" }}>
        {/* Section Accompagnement immobilier */}
        <section className="section services-intro-section" style={{ position: "relative", overflow: "visible", zIndex: 2, paddingBottom: "100px", paddingTop: "80px" }}>
          <CloudRed top="15%" right="-15%" width="600px" height="600px" zIndex={1} opacity={0.5} />
          <div className="containere">
            <div className="services-intro-contente">
              <h2 className="services-intro-title">
                Un accompagnement<br />
                immobilier structuré<br />
                <span className="services-intro-highlight">POUR ACHETER OU INVESTIR AU MAROC</span><br />
                EN TOUTE CONFIANCE.
              </h2>
              <div className="services-intro-divider"></div>
              <div className="services-intro-description">
                <p className="services-intro-text">
                  EM IMMO accompagne particuliers, investisseurs et MRE dans leurs projets immobiliers au Maroc.
                </p>
                <p className="services-intro-text">
                  Notre mission est simple : sécuriser chaque étape de votre projet immobilier, de la réflexion initiale jusqu&apos;à la remise des clés.
                </p>
                <p className="services-intro-text">
                  Grâce à notre présence locale et à notre connaissance du marché immobilier marocain, nous proposons un accompagnement clair, méthodique et adapté à chaque profil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Un accompagnement immobilier complet, de A à Z */}
        <section className="section about-section" style={{ paddingTop: "80px", marginTop: "0", paddingBottom: "80px", overflow: "visible" }}>
          <div className="containere" style={{ overflow: "visible" }}>
            <div className="services-accompaniment-headere">
              <h2 className="services-accompaniment-title">
                Un accompagnement<br />
                immobilier complet,<br />
                de A à Z
              </h2>
            </div>

            {/* Services Items */}
            <div className="services-items" style={{marginLeft:'0px',marginRight:'0px', width:'100%', marginTop:'0px'}}>
                {/* Item 1: Conseil et analyse du projet immobilier */}
                <div className="service-item" style={{ position: "relative" }}>
                  <div className="service-item-content">
                    <div className="service-item-header">
                      <span className="service-checkmark">
                        <span className="material-symbols-outlined">verified</span>
                      </span>
                      <h3 className="service-item-title">Conseil et analyse<br />du projet immobilier</h3>
                    </div>
                    <p className="service-item-description">
                      Chaque projet immobilier commence par une analyse précise de votre situation. EM IMMO étudie votre objectif (habiter ou investir), votre budget, votre horizon temporel et vos attentes pour vous orienter vers les projets immobiliers les plus pertinents au Maroc.
                    </p>
                  </div>
                  <div className="service-item-image">
                    <Image 
                      src="/services/Gemini_Generated_Image_ix9xuoix9xuoix9x.png" 
                      alt="Conseil et analyse du projet immobilier" 
                      width={800} 
                      height={400} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      quality={95}
                    />
                  </div>
                </div>

                {/* Item 2: Sélection de projets immobiliers fiables */}
                <div className="service-item" style={{ position: "relative" }}>
                  <div className="service-item-content">
                    <div className="service-item-header">
                      <span className="service-checkmark">
                        <span className="material-symbols-outlined">verified</span>
                      </span>
                      <h3 className="service-item-title">Sélection de projets<br />immobiliers fiables</h3>
                    </div>
                    <p className="service-item-description">
                      EM IMMO ne propose pas tout le marché, mais sélectionne des projets immobiliers selon des critères stricts : emplacement, qualité de construction, sérieux du promoteur et potentiel de valorisation. Cette sélection vous permet d&apos;accéder à des projets immobiliers fiables adaptés à une logique patrimoniale durable.
                    </p>
                  </div>
                  <div className="service-item-image">
                    <Image 
                      src="/services/Gemini_Generated_Image_tmnwcmtmnwcmtmnw.png" 
                      alt="Sélection de projets immobiliers fiables" 
                      width={800} 
                      height={400} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      quality={95}
                    />
                  </div>
                </div>

                {/* Item 3: Accompagnement administratif et notarial */}
                <div className="service-item" style={{ position: "relative" }}>
                  <div className="service-item-content">
                    <div className="service-item-header">
                      <span className="service-checkmark">
                        <span className="material-symbols-outlined">verified</span>
                      </span>
                      <h3 className="service-item-title">Accompagnement administratif<br />et notarial</h3>
                    </div>
                    <p className="service-item-description">
                      L&apos;achat d&apos;un bien immobilier au Maroc nécessite une parfaite maîtrise des démarches administratives et juridiques. EM IMMO vous accompagne à toutes les étapes : réservation, contractualisation et coordination avec les intervenants notariaux. L&apos;objectif : sécuriser juridiquement votre acquisition immobilière au Maroc.
                    </p>
                  </div>
                  <div className="service-item-image">
                    <Image 
                      src="/services/Gemini_Generated_Image_619sy1619sy1619s copy.png" 
                      alt="Accompagnement administratif et notarial" 
                      width={800} 
                      height={400} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      quality={95}
                    />
                  </div>
                </div>

                {/* Item 4: Suivi du projet jusqu'à la livraison */}
                <div className="service-item" style={{ position: "relative" }}>
                  <div className="service-item-content">
                    <div className="service-item-header">
                      <span className="service-checkmark">
                        <span className="material-symbols-outlined">verified</span>
                      </span>
                      <h3 className="service-item-title">Suivi du projet<br />jusqu&apos;à la livraison</h3>
                    </div>
                    <p className="service-item-description">
                      L&apos;accompagnement EM IMMO ne s&apos;arrête pas à la signature. EM IMMO assure un suivi continu du projet jusqu&apos;à la livraison du bien, pour garantir une expérience fluide et transparente.
                    </p>
                  </div>
                  <div className="service-item-image">
                    <Image 
                      src="/imglanding/Gemini_Generated_Image_l678a1l678a1l678 copy.png" 
                      alt="Suivi du projet jusqu'à la livraison" 
                      width={800} 
                      height={400} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      quality={95}
                    />
                  </div>
                </div>
              </div>
          </div>
        </section>

        
      </main>

      
    </div>
  );
}

