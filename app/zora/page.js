"use client";

/* ==================================================
   IMPORTS
================================================== */
import React, { useState } from "react";
import Image from "next/image";
import CloudRed from "../components/CloudRed";
import "./style.css";
import Formulaire from "../components/Formulaire";

/* ==================================================
   CONSTANTES
================================================== */
const zoraHeroBg = "/imglanding/zora-carousel-3.png";

/* ==================================================
   CAROUSEL – THUMBNAILS ARCHITECTURE
================================================== */
function ZoraFeaturesCarousel({ onImageSelect, selectedImage }) {
  const slides = [
    { id: 1, image: "/imglanding/zora-carousel-1.png", alt: "Vue du projet ZORA" },
    { id: 2, image: "/imglanding/zora-carousel-2.png", alt: "Salon ZORA" },
    { id: 3, image: "/imglanding/zora-carousel-3.png", alt: "Vue du projet ZORA" },
    { id: 4, image: "/imglanding/zora-carousel-4.png", alt: "Chambre ZORA" },
    { id: 5, image: "/imglanding/zora-architecture-frame5.png", alt: "Façade ZORA" },
    { id: 6, image: "/imglanding/zora-rooftop.png", alt: "Rooftop ZORA" },
    { id: 7, image: "/imglanding/zora-design-interieur.png", alt: "Design intérieur ZORA" },
    { id: 8, image: "/imglanding/zora-localisation.png", alt: "Localisation ZORA" },
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
   PAGE PRINCIPALE – ZORA
================================================== */
export default function ZoraPage() {
  const [mainImage, setMainImage] = useState(
    "/imglanding/zora-carousel-1.png"
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
            alt="Résidence ZORA - vue d'ensemble"
            src={zoraHeroBg}
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
            LA LUMIÈRE DU CENTRE,
            <br />
            LA SÉRÉNITÉ DU HAUT STANDING.
          </p>
        </section>

        {/* ==================================================
            ARCHITECTURE SECTION
        ================================================== */}
        <section className="architecture-section-container">

          {/* Thumbnails */}
          <div className="architecture-thumbnails">
            <ZoraFeaturesCarousel
              onImageSelect={setMainImage}
              selectedImage={mainImage}
            />
          </div>

          {/* Image principale */}
          <div className="architecture-main-image">
            <Image
              src={mainImage}
              alt="Façade du projet ZORA"
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
              CONTEMPORAINE
              <br />
              &amp; INSPIRÉE
            </h2>

            <p className="architecture-subtitle">
              Immeuble R+5 à l&apos;esthétique raffinée
              Structure béton &amp; acier, finitions en verre et enduit minéral clair
              Triple façade et terrasses pour la majorité des appartements
              
              Hall d&apos;entrée au design épuré, avec matériaux nobles
              
              Circulations lumineuses et volumes optimisés
              
              Une architecture qui respire la lumière et le confort, au cœur du dynamisme marrakchi.
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
