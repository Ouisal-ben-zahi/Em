"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import styles from "./Footer.module.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";

export default function Footer() {
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
     <footer className={styles.footer}>
        <div className={styles.footerMain}>
          <div className={`container ${styles.footerMainContainer} ${styles.footerGrid}`}>
            <div className={styles.footerBrand}>
              <Image src={brandIconImg} alt="Brand Icon" width={120} height={120} className={styles.footerBrandIcon} />
              <Image src={footerLogoImg} alt="MOROCCO IMMOBILIER" width={300} height={80} className={styles.footerLogoImg} />
            </div>
            <div className={styles.footerNavigation}>
              <h3 className={styles.footerNavigationTitle}>Navigation</h3>
              <div className={styles.footerNavigationLinks}>
                <Link href="/">Accueil</Link>
                <Link href="/projets">Nos projets</Link>
                <Link href="/services">Services</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
            <div className={styles.footerSupport}>
              <h3 className={styles.footerSupportTitle}>Support</h3>
              <div className={styles.footerSupportLinks}>
                <a href="/contact">Nous contacter</a>
                <a href="/confidentialite">Politique de confidentialité</a>
                <a href="/faq">FAQ</a>
              </div>
            </div>
            <div className={styles.footerNewsletter}>
              <div className={styles.footerNewsletterText}>
                Restez informé &<br />
                <strong>abonnez-vous</strong><br />
                à notre blog !
              </div>
              <form className={styles.footerNewsletterForm} onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="votre adresse e-mail" 
                  className={styles.footerEmailInput}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className={`btn primary ${styles.leadFormSubmit}`}>ENVOYER</button>
              </form>
              {newsletterStatus.message && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '12px', 
                  color: newsletterStatus.type === 'success' ? '#4caf50' : '#e01f26' 
                }}>
                  {newsletterStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={`container ${styles.footerBottomContainer} ${styles.footerBottomContent}`}>
            <div className={styles.footerBottomText}>
              <div>Votre partenaire immobilier de confiance</div>
              <div>Marrakech, Maroc</div>
            </div>
            <div className={styles.footerCopyright}>©2025 EM IMMO</div>
          </div>
        </div>
      </footer>
  );
}

