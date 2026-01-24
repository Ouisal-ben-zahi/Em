"use client";

/* ==================================================
   IMPORTS
================================================== */
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import CloudRed from "../components/CloudRed";
import "./style.css";
import Formulaire from "../components/Formulaire";

/* ==================================================
   CONSTANTES
================================================== */
const goldGardenHeroBg = "/imglanding/gold-garden-hero.webp";

const slides = [
  { id: 1, image: "/imglanding/gold-garden-carousel-1.webp", alt: "Vue extérieure du projet Gold Garden - Façade moderne" },
  { id: 2, image: "/imglanding/gold-garden-carousel-2.webp", alt: "Vue intérieure du projet Gold Garden - Espace de vie" },
  { id: 3, image: "/imglanding/gold-garden-carousel-3.webp", alt: "Vue panoramique du projet Gold Garden" },
  { id: 4, image: "/imglanding/gold-garden-carousel-4.webp", alt: "Détails architecturaux du projet Gold Garden" },
  { id: 5, image: "/imglanding/gold-garden-architecture.webp", alt: "Architecture du projet Gold Garden - Vue d'ensemble" },
  { id: 6, image: "/imglanding/gold-garden-confort-1.webp", alt: "Vue extérieure du projet Gold Garden - Façade moderne" },
  { id: 7, image: "/imglanding/gold-garden-confort-2.webp", alt: "Vue intérieure du projet Gold Garden - Espace de vie" },
  { id: 8, image: "/imglanding/gold-garden-rooftop.webp", alt: "Vue panoramique du projet Gold Garden" },
];

/* ==================================================
   CAROUSEL – THUMBNAILS ARCHITECTURE
================================================== */
const GoldGardenFeaturesCarousel = memo(function GoldGardenFeaturesCarousel({ onImageSelect, selectedImage }) {
  const handleKeyDown = useCallback((e, slide) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onImageSelect(slide.image);
    }
  }, [onImageSelect]);

  const handleImageClick = useCallback((image) => {
    onImageSelect(image);
  }, [onImageSelect]);

  return (
    <section 
      className="architecture-thumbnails-scroll"
      aria-label="Carrousel d'images du projet Gold Garden"
    >
      <div className="architecture-thumbnails-list" role="list">
        {slides.map((slide) => {
          const isSelected = selectedImage === slide.image;

          return (
            <div
              key={slide.id}
              role="listitem"
              className={`architecture-thumbnail-item ${isSelected ? "selected" : ""}`}
              onClick={() => handleImageClick(slide.image)}
              onKeyDown={(e) => handleKeyDown(e, slide)}
              tabIndex={0}
              aria-label={`Sélectionner l'image ${slide.id}: ${slide.alt}`}
              aria-pressed={isSelected}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                width={120}
                height={120}
                className="architecture-thumbnail-image"
                loading="lazy"
                quality={85}
                sizes="(max-width: 768px) 170px, 140px"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
});





/* ==================================================
   PAGE PRINCIPALE – GOLD GARDEN
================================================== */
export default function GoldGardenPage() {
  const [mainImage, setMainImage] = useState(
    "/imglanding/gold-garden-architecture.webp"
  );

  const handleImageSelect = useCallback((image) => {
    setMainImage(image);
  }, []);

  return (
    <div className="gold-garden-wrapper">
      <div className="element-light">

        {/* ==================================================
            HERO SECTION
        ================================================== */}
        <section className="hero-image-wrapper" aria-label="Section héro du projet Gold Garden">
          <Image
            className="element"
            alt="Résidence Gold Garden - vue d'ensemble du projet immobilier haut de gamme à Marrakech"
            src={goldGardenHeroBg}
            width={1920}
            height={1080}
            quality={90}
            priority
            sizes="100vw"
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <div className="hero-gradient-overlay" aria-hidden="true"></div>

          <h1 className="l-harmonie-entre">
            L&#39;HARMONIE ENTRE LUMIÈRE,
            <br />
            NATURE ET ÉLÉGANCE
          </h1>
        </section>

        {/* ==================================================
            ARCHITECTURE SECTION
        ================================================== */}
        <section className="architecture-section-container">

          {/* Thumbnails */}
          <div className="architecture-thumbnails">
            <GoldGardenFeaturesCarousel
              onImageSelect={handleImageSelect}
              selectedImage={mainImage}
            />
          </div>

          {/* Image principale */}
          <div className="architecture-main-image">
            <Image
              src={mainImage}
              alt="Vue principale du projet Gold Garden - Architecture moderne et durable"
              width={900}
              height={520}
              className="architecture-image-img"
              quality={85}
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 900px"
              key={mainImage}
            />
          </div>

          {/* Contenu texte */}
          <div className="architecture-content">

            <h2 className="architecture-inspir">
              ARCHITECTURE
              <br />
              INSPIRÉE ET
              <br />
              DURABLE
            </h2>

            <p className="architecture-subtitle">
              Enduit minéral clair &amp; teintes naturelles
              Menuiseries aluminium hautes performances
              Marbres &amp; grès cérame grand format
              Détails en bois noble
              Peintures minérales apaisantes
              Une architecture moderne, sobre et intemporelle,
              pensée pour traverser les années.
            </p>

            {/* ==================================================
                FEATURES / SERVICES
            ================================================== */}
            <div className="group">

              <div className="layer-4" role="article" aria-label="Parkings sécurisés">
                <Image
                  className="parking-sign"
                  alt="Icône représentant un parking sécurisé"
                  src="https://c.animaapp.com/nd0FfKH2/img/parking-sign@2x.png"
                  width={42}
                  height={42}
                  loading="lazy"
                  quality={75}
                />
                <div className="text-wrapper-5">Parkings sécurisés</div>
              </div>

              <div className="layer-5" role="article" aria-label="Contrôle d'accès digitalisé">
                <Image
                  className="img-2"
                  alt="Icône représentant un système de contrôle d'accès digitalisé"
                  src="https://c.animaapp.com/nd0FfKH2/img/air-purifier-gen@2x.png"
                  width={42}
                  height={42}
                  loading="lazy"
                  quality={75}
                />
                <div className="text-wrapper-5">
                  Contrôle d&apos;accès digitalisé
                </div>
              </div>

              <div className="layer-6" role="article" aria-label="Ascenseurs modernes">
                <Image
                  className="img-2"
                  alt="Icône représentant un ascenseur moderne"
                  src="https://c.animaapp.com/nd0FfKH2/img/elevator@2x.png"
                  width={42}
                  height={42}
                  loading="lazy"
                  quality={75}
                />
                <div className="ascenseurs-moderne">
                  Ascenseurs
                  <br />
                  Modernes
                </div>
              </div>

              <div className="layer-7" role="article" aria-label="Espaces verts entretenus">
                <Image
                  className="park"
                  alt="Icône représentant des espaces verts entretenus"
                  src="https://c.animaapp.com/nd0FfKH2/img/park@2x.png"
                  width={42}
                  height={42}
                  loading="lazy"
                  quality={75}
                />
                <div className="text-wrapper-5">
                  Espaces verts entretenus
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
      <Formulaire />

    </div>
  );
}
