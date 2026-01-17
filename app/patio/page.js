"use client";

/* ==================================================
   IMPORTS
================================================== */
import React, { useState } from "react";
import Image from "next/image";
import CloudRed from "../components/CloudRed";
import "./style.css";

/* ==================================================
   CONSTANTES
================================================== */
const patioHeroBg = "/imglanding/11.png";

/* ==================================================
   CAROUSEL – THUMBNAILS ARCHITECTURE
================================================== */
function PatioFeaturesCarousel({ onImageSelect, selectedImage }) {
  const slides = [
    { id: 1, image: "/imglanding/4.png", alt: "Vue du projet Patio" },
    { id: 2, image: "/imglanding/10.png", alt: "Vue du projet Patio" },
    { id: 3, image: "/imglanding/3.png", alt: "Vue du projet Patio" },
    { id: 4, image: "/imglanding/6.jpg", alt: "Vue du projet Patio" },
    { id: 5, image: "/imglanding/8.png", alt: "Vue du projet Patio" },
    { id: 6, image: "/imglanding/5.jpg", alt: "Vue du projet Patio" },
    { id: 7, image: "/imglanding/7.png", alt: "Vue du projet Patio" },
    { id: 8, image: "/imglanding/1.png", alt: "Vue du projet Patio" },
  ];

  return (
    <section className="architecture-thumbnails-scroll">
      <div className="architecture-thumbnails-list">
        {slides.map((slide) => {
          const isSelected = selectedImage === slide.image;

          return (
            <div
              key={slide.id}
              className={`architecture-thumbnail-item ${isSelected ? "selected" : ""}`}
              onClick={() => onImageSelect(slide.image)}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                width={120}
                height={120}
                className="architecture-thumbnail-image"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ==================================================
   PAGE PRINCIPALE – PATIO
================================================== */
export default function PatioPage() {
  const [mainImage, setMainImage] = useState(
    "/imglanding/3.png"
  );

  return (
    <div className="gold-garden-wrapper">
      <div className="element-light">

        {/* ==================================================
            HERO SECTION
        ================================================== */}
        <section className="hero-image-wrapper">
          <Image
            className="element"
            alt="Résidence Patio - vue d'ensemble"
            src={patioHeroBg}
            width={1920}
            height={1080}
            quality={100}
            priority
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <div className="hero-gradient-overlay"></div>

          <p className="l-harmonie-entre">
            L&#39;HARMONIE ENTRE LUMIÈRE,
            <br />
            NATURE ET ÉLÉGANCE
          </p>
        </section>

        {/* ==================================================
            ARCHITECTURE SECTION
        ================================================== */}
        <section className="architecture-section-container">

          {/* Thumbnails */}
          <div className="architecture-thumbnails">
            <PatioFeaturesCarousel
              onImageSelect={setMainImage}
              selectedImage={mainImage}
            />
          </div>

          {/* Image principale */}
          <div className="architecture-main-image">
            <Image
              src={mainImage}
              alt="Façade du projet Patio"
              width={900}
              height={520}
              className="architecture-image-img"
              priority
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

              <div className="layer-4">
                
                <img
                  className="parking-sign"
                  alt="Parking"
                  src="https://c.animaapp.com/nd0FfKH2/img/parking-sign@2x.png"
                />
                <div className="text-wrapper-5">Parkings sécurisés</div>
              </div>

              <div className="layer-5">
                
                <img
                  className="img-2"
                  alt="Contrôle d'accès"
                  src="https://c.animaapp.com/nd0FfKH2/img/air-purifier-gen@2x.png"
                />
                <div className="text-wrapper-5">
                  Contrôle d&apos;accès digitalisé
                </div>
              </div>

              <div className="layer-6">
                
                <img
                  className="img-2"
                  alt="Ascenseur"
                  src="https://c.animaapp.com/nd0FfKH2/img/elevator@2x.png"
                />
                <div className="ascenseurs-moderne">
                  Ascenseurs
                  <br />
                  Modernes
                </div>
              </div>

              <div className="layer-7">
                
                <img
                  className="park"
                  alt="Espaces verts"
                  src="https://c.animaapp.com/nd0FfKH2/img/park@2x.png"
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
