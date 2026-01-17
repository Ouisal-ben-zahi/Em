"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CloudRed from "../components/CloudRed";
import { supabase } from "../../lib/supabase";
import "./style.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";

export default function ConfidentialitePage() {
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
    <div className="confidentialite-page">
      <main className="confidentialite-main">
        <CloudRed top="8%" left="-12%" width="750px" height="750px" zIndex={0} opacity={0.45} color="red" />
        <CloudRed top="35%" right="-8%" width="680px" height="680px" zIndex={0} opacity={0.4} color="red" />
        <CloudRed top="58%" left="-10%" width="720px" height="720px" zIndex={0} opacity={0.35} color="red" />
        <CloudRed top="82%" right="-6%" width="620px" height="620px" zIndex={0} opacity={0.4} color="red" />
        
        <div className="container">
          <div className="confidentialite-content">
            <h1>POLITIQUE DE CONFIDENTIALITÉ – EM IMMO</h1>

            <section className="confidentialite-section">
              <h2>1. Introduction</h2>
              <p>
                La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site EM IMMO
                sur la manière dont leurs données personnelles sont collectées, utilisées et protégées,
                conformément aux réglementations en vigueur et aux exigences des plateformes publicitaires
                telles que Meta (Facebook / Instagram) et Snapchat.
              </p>
              <p>
                EM IMMO attache une importance particulière à la transparence, à la confidentialité et à la
                sécurité des données personnelles.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>2. Données personnelles collectées</h2>
              <p>
                Dans le cadre de l'utilisation du site et des formulaires de contact ou de génération de prospects,
                EM IMMO peut collecter les données personnelles suivantes :
              </p>
              <ul>
                <li>Nom et prénom</li>
                <li>Adresse e-mail</li>
                <li>Numéro de téléphone</li>
                <li>Informations liées au projet immobilier (objectif, budget, délai)</li>
                <li>Données de navigation (pages consultées, interactions anonymes)</li>
              </ul>
              <p>
                Les données sont collectées uniquement lorsque l'utilisateur les fournit volontairement via un
                formulaire ou une interaction directe avec le site.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>3. Finalités de la collecte des données</h2>
              <p>
                Les données personnelles collectées sont utilisées exclusivement pour les finalités suivantes :
              </p>
              <ul>
                <li>Recontacter l'utilisateur suite à une demande d'information</li>
                <li>Qualifier et analyser un projet immobilier</li>
                <li>Présenter des projets immobiliers adaptés au profil de l'utilisateur</li>
                <li>Assurer un accompagnement immobilier personnalisé</li>
                <li>Améliorer l'expérience utilisateur et la performance du site</li>
              </ul>
              <p>
                Aucune décision automatisée ni profilage à des fins sensibles n'est effectué.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>4. Publicité et plateformes partenaires (Meta & Snapchat)</h2>
              <p>
                Dans le cadre de ses campagnes de communication, EM IMMO peut utiliser des outils
                publicitaires proposés par des plateformes tierces telles que Meta (Facebook / Instagram) et
                Snapchat.
              </p>
              <p>
                Ces plateformes peuvent collecter des données anonymes ou agrégées via des technologies
                telles que les cookies ou pixels publicitaires afin de :
              </p>
              <ul>
                <li>Mesurer la performance des campagnes publicitaires</li>
                <li>Améliorer la pertinence des contenus proposés</li>
                <li>Éviter la diffusion de publicités non pertinentes</li>
              </ul>
              <p>
                EM IMMO ne transmet aucune donnée personnelle sensible aux plateformes publicitaires.
                Les données collectées via les formulaires publicitaires sont traitées exclusivement par EM IMMO.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>5. Partage des données</h2>
              <p>
                Les données personnelles collectées ne sont ni vendues, ni louées, ni cédées à des tiers.
                Elles peuvent être partagées uniquement avec des partenaires professionnels strictement
                nécessaires à la réalisation du projet immobilier (ex : promoteurs, notaires), et uniquement dans
                l'intérêt direct du client.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>6. Durée de conservation</h2>
              <p>
                Les données personnelles sont conservées pendant une durée limitée, strictement nécessaire aux
                finalités pour lesquelles elles ont été collectées, sauf obligation légale contraire.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>7. Sécurité des données</h2>
              <p>
                EM IMMO met en œuvre des mesures techniques et organisationnelles appropriées afin de
                garantir la sécurité, la confidentialité et l'intégrité des données personnelles, et de prévenir tout
                accès non autorisé, perte ou divulgation.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>8. Droits des utilisateurs</h2>
              <p>
                Conformément à la réglementation applicable, l'utilisateur dispose des droits suivants :
              </p>
              <ul>
                <li>Droit d'accès à ses données</li>
                <li>Droit de rectification</li>
                <li>Droit de suppression</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p>
                Ces droits peuvent être exercés à tout moment via le formulaire de contact du site.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>9. Cookies et technologies similaires</h2>
              <p>
                Le site EM IMMO peut utiliser des cookies ou technologies similaires à des fins de :
              </p>
              <ul>
                <li>Mesure d'audience</li>
                <li>Analyse de performance</li>
                <li>Optimisation de l'expérience utilisateur</li>
              </ul>
              <p>
                L'utilisateur peut configurer son navigateur pour refuser ou limiter l'utilisation des cookies.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>10. Modification de la politique de confidentialité</h2>
              <p>
                EM IMMO se réserve le droit de modifier la présente politique de confidentialité à tout moment
                afin de l'adapter aux évolutions légales, techniques ou publicitaires.
              </p>
              <p>
                La version en vigueur est celle publiée sur le site au moment de la consultation.
              </p>
            </section>

            <section className="confidentialite-section">
              <h2>11. Contact</h2>
              <p>
                Pour toute question relative à la présente politique de confidentialité ou à l'utilisation des données
                personnelles, l'utilisateur peut contacter EM IMMO via le formulaire de contact du site.
              </p>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
}

