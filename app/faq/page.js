"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CloudRed from "../components/CloudRed";
import { supabase } from "../../lib/supabase";
import "./style.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: null, message: '' });

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
    <div className="faq-page">
      <main className="faq-main">
        <CloudRed top="8%" left="-12%" width="750px" height="750px" zIndex={0} opacity={0.45} color="red" />
        <CloudRed top="35%" right="-8%" width="680px" height="680px" zIndex={0} opacity={0.4} color="red" />
        <CloudRed top="58%" left="-10%" width="720px" height="720px" zIndex={0} opacity={0.35} color="red" />
        <CloudRed top="82%" right="-6%" width="620px" height="620px" zIndex={0} opacity={0.4} color="red" />
        
        <div className="container">
          <div className="faq-content">
            <h1>FAQ – EM IMMO</h1>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(0)}
              >
                <span>EM IMMO est-il le promoteur immobilier ?</span>
                <span className={`faq-toggle ${openIndex === 0 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 0 && (
                <div className="faq-answer">
                  <p>
                    <strong>Non.</strong>
                  </p>
                  <p>
                    EM IMMO agit en tant que commercialisateur exclusif et partenaire des promoteurs immobiliers
                    pour la commercialisation des projets.
                  </p>
                </div>
              )}
            </section>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(1)}
              >
                <span>Que signifie &quot;commercialisateur exclusif&quot; ?</span>
                <span className={`faq-toggle ${openIndex === 1 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 1 && (
                <div className="faq-answer">
                  <p>
                    EM IMMO est mandaté par le promoteur pour représenter et commercialiser le projet, avec un
                    accompagnement structuré et un interlocuteur unique.
                  </p>
                </div>
              )}
            </section>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(2)}
              >
                <span>EM IMMO travaille-t-il directement avec les promoteurs ?</span>
                <span className={`faq-toggle ${openIndex === 2 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 2 && (
                <div className="faq-answer">
                  <p>
                    <strong>Oui.</strong>
                  </p>
                  <p>
                    EM IMMO travaille en partenariat direct avec les promoteurs immobiliers dans le cadre de
                    mandats de commercialisation.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(3)}
              >
                <span>Le prix est-il plus élevé en passant par EM IMMO ?</span>
                <span className={`faq-toggle ${openIndex === 3 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 3 && (
                <div className="faq-answer">
                  <p>
                    <strong>Non.</strong>
                  </p>
                  <p>
                    Le prix du bien est identique à celui du promoteur.
                    La rémunération d&apos;EM IMMO est prise en charge par le promoteur.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(4)}
              >
                <span>Peut-on payer en plusieurs fois ? Existe-t-il un plan de paiement ?</span>
                <span className={`faq-toggle ${openIndex === 4 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 4 && (
                <div className="faq-answer">
                  <p>
                    <strong>Oui.</strong>
                  </p>
                  <p>
                    La majorité des projets proposent des plans de paiement échelonnés, définis par le promoteur
                    (réservation, échéances intermédiaires, livraison).
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(5)}
              >
                <span>Les plans de paiement sont-ils sécurisés ?</span>
                <span className={`faq-toggle ${openIndex === 5 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 5 && (
                <div className="faq-answer">
                  <p>
                    <strong>Oui.</strong>
                  </p>
                  <p>
                    Les paiements sont effectués dans un cadre légal, selon les conditions prévues par le promoteur
                    et les intervenants notariaux.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(6)}
              >
                <span>EM IMMO accompagne-t-il jusqu&apos;à la livraison ?</span>
                <span className={`faq-toggle ${openIndex === 6 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 6 && (
                <div className="faq-answer">
                  <p>
                    <strong>Oui.</strong>
                  </p>
                  <p>
                    EM IMMO accompagne le client de la présentation du projet jusqu&apos;à la livraison du bien.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(7)}
              >
                <span>Puis-je acheter à distance si je vis à l&apos;étranger ?</span>
                <span className={`faq-toggle ${openIndex === 7 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 7 && (
                <div className="faq-answer">
                  <p>
                    <strong>Oui.</strong>
                  </p>
                  <p>
                    EM IMMO accompagne régulièrement des MRE et des clients résidant à l&apos;étranger, avec un suivi
                    adapté.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(8)}
              >
                <span>Qui s&apos;occupe des démarches administratives et notariales ?</span>
                <span className={`faq-toggle ${openIndex === 8 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 8 && (
                <div className="faq-answer">
                  <p>
                    Les démarches sont réalisées dans le cadre légal en vigueur, avec un accompagnement assuré
                    par EM IMMO en coordination avec les intervenants concernés.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(9)}
              >
                <span>À qui s&apos;adressent les projets EM IMMO ?</span>
                <span className={`faq-toggle ${openIndex === 9 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 9 && (
                <div className="faq-answer">
                  <p>
                    Aux particuliers souhaitant habiter, aux investisseurs immobiliers et aux MRE souhaitant investir
                    au Maroc.
                  </p>
                </div>
              )}
            </section>

            <div className="faq-divider">⸻</div>

            <section className="faq-section">
              <h2 
                className="faq-question-header"
                onClick={() => toggleQuestion(10)}
              >
                <span>Comment être contacté par EM IMMO ?</span>
                <span className={`faq-toggle ${openIndex === 10 ? 'open' : ''}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              {openIndex === 10 && (
                <div className="faq-answer">
                  <p>
                    Il suffit de remplir le formulaire de contact.
                    Un conseiller EM IMMO vous recontactera pour échanger sur votre projet.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      
    </div>
  );
}

