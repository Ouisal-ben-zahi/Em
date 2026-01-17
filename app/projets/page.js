"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CloudRed from "../components/CloudRed";
import { supabase } from "../../lib/supabase";
import "./style.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";
const patioImg = "/imglanding/11.png";
const gardenImg = "/imglanding/5.png";
const zoraImg = "/imglanding/zora-projet.jpg";
import zoomOutMapIcon from "../icons/zoom_out_map_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";
import downloadIcon from "../icons/download_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png";

const projects = [
  {
    title: "GOLD GARDEN",
    subtitle: "Moderne & rentable",
    bullets: [
      "Achat sur plan sécurisé",
      "Prix inférieur au marché livré",
      "Forte demande locative",
      "Visites chantier & visio",
      "Livraison prévue: (à préciser)",
    ],
    action: "Visiter Gold Garden",
    image: gardenImg,
    imagePosition: "right",
  },
  {
    title: "PATIO",
    subtitle: "Résidence familiale & durable",
    bullets: [
      "Volumes optimisés & lumineux",
      "Parfait résidence principale",
      "Paiements échelonnés",
      "Valorisation future probable",
      "Suivi chantier mensuel",
    ],
    action: "Découvrir Patio",
    image: patioImg,
    imagePosition: "left",
  },
  {
    title: "ZORA",
    subtitle: "Résidence élégante & conviviale",
    bullets: [
      "Architecture contemporaine",
      "Emplacement stratégique",
      "Investissement sécurisé",
      "Confort & qualité",
      "Livraison prévue: (à préciser)",
    ],
    action: "Découvrir ZORA",
    image: zoraImg,
    imagePosition: "right",
  },
];

export default function ProjetsPage() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: null, message: '' });

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
    <div className="projets-page">
      <main className="projets-main">
        <CloudRed top="10%" right="-30%" width="800px" height="600px" zIndex={1} opacity={0.5} />
        
        <div className="container">
          <div className="projects-section-header">
            <h1 className="projets-title">Nos projets disponibles sur plan</h1>
            <p className="projects-subtitle">
              Découvrez nos projets immobiliers sur plan à Marrakech, sélectionnés pour leur qualité, leur
              emplacement stratégique et leur potentiel de valorisation. EM IMMO vous accompagne dans un
              achat sécurisé, transparent et rentable, que vous soyez sur place ou à distance.
            </p>
          </div>

          <div className="projects-list-column">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`project-item-horizontal ${project.imagePosition === 'left' ? 'image-left' : 'image-right'}`}
              >
                <div className="project-content">
                  <h3 className="project-title">{project.title} <span className="project-subtitle">{project.subtitle}</span></h3>
                  <ul className="project-features">
                    {project.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <Link href={
                    project.title === "PATIO" ? "/patio" : 
                    project.title === "ZORA" ? "/zora" : 
                    project.title === "GOLD GARDEN" ? "/gold-garden" : 
                    "/#projets"
                  }>
                    <button className="btn primary projectAction">
                      <span className="icon-square icon-square-white">
                        <Image src={zoomOutMapIcon} alt="" width={25} height={25} />
                      </span>
                      <span>{project.action}</span>
                    </button>

                  
                  </Link>
                </div>
                <div className="project-image-wrapper">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    width={1200} 
                    height={1600} 
                    className="project-image"
                    quality={95}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      
    </div>
  );
}

