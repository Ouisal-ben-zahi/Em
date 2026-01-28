"use client";

import { useState } from "react";
import emailjs from '@emailjs/browser';
import { supabase } from "../../lib/supabase";
import CloudRed from "./CloudRed";
import Image from "next/image";
import styles from "./formulaire.module.css";

const leadFormImg = "/imglanding/5w.webp";

function LeadForm() {
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    projet: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // EmailJS sera initialisé automatiquement lors de l'envoi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // 1. Envoyer par EmailJS (optionnel, ne bloque pas si échec)
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (serviceId && templateId && publicKey) {
        try {
          const templateParams = {
            from_name: formData.nom,
            from_phone: formData.telephone,
            // IMPORTANT: le nom du champ doit correspondre à la variable du template EmailJS
            // Le template utilise {{projet}}, donc on envoie "projet" et non "project"
            projet: formData.projet,
            budget: formData.budget || 'Non spécifié',
            message: formData.message || 'Aucun message',
            to_name: 'EM IMMO',
            date: new Date().toLocaleString('fr-FR'),
          };

          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          console.log('EmailJS envoyé avec succès');
        } catch (emailjsError) {
          console.warn('Erreur EmailJS (non bloquante):', emailjsError);
        }
      } else {
        console.warn('EmailJS non configuré - variables manquantes');
      }

      // 2. Enregistrer dans Supabase (prioritaire)
      if (supabase) {
        try {
          const { data, error: supabaseError } = await supabase
            .from('leads')
            .insert([
              {
                nom: formData.nom,
                telephone: formData.telephone,
                projet: formData.projet,
                budget: formData.budget || null,
                message: formData.message || null,
                source: 'landing_page_form',
                created_at: new Date().toISOString()
              }
            ])
            .select();

          if (supabaseError) {
            console.error('Erreur Supabase:', supabaseError);
            throw new Error(`Erreur Supabase: ${supabaseError.message}`);
          } else {
            console.log('Lead enregistré dans Supabase avec succès:', data);
          }
        } catch (supabaseErr) {
          console.error('Erreur Supabase:', supabaseErr);
          throw supabaseErr;
        }
      } else {
        console.warn('Supabase non configuré');
        throw new Error('Supabase non configuré');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.'
      });
      setFormData({
        nom: '',
        telephone: '',
        projet: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.formulaire} onSubmit={handleSubmit}>
      <div className={styles.formulaireField}>
        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          name="nom"
          placeholder="NOM"
          className={styles.formulaireInput}
          value={formData.nom}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      <div className={styles.formulaireField}>
        <label htmlFor="telephone">Téléphone / WhatsApp</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="TÉLÉPHONE / WHATSAPP"
          className={styles.formulaireInput}
          value={formData.telephone}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>
      <div className={styles.formulaireField}>
        <label htmlFor="projet">Projet</label>
        <select
          id="projet"
          name="projet"
          className={`${styles.formulaireInput} ${styles.formulaireSelect}`}
          value={formData.projet}
          onChange={handleChange}
          required
          aria-required="true"
        >
          <option value="" disabled>Sélectionner un projet</option>
          <option value="PATIO">Patio Résidence</option>
          <option value="GOLD">Gold Garden</option>
          <option value="ZORA">Zora Flowers</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div className={styles.formulaireField}>
        <label htmlFor="budget">Budget</label>
        <input
          type="text"
          id="budget"
          name="budget"
          placeholder="BUDGET"
          className={styles.formulaireInput}
          value={formData.budget}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formulaireField}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="MESSAGE"
          className={`${styles.formulaireInput} ${styles.formulaireTextarea}`}
          value={formData.message}
          onChange={handleChange}
          rows={4}
        ></textarea>
      </div>
      {submitStatus.message && (
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          style={{
            padding: '12px',
            marginBottom: '16px',
            borderRadius: '4px',
            backgroundColor: submitStatus.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
            color: submitStatus.type === 'success' ? '#4caf50' : '#f44336',
            fontSize: '14px'
          }}
        >
          {submitStatus.message}
        </div>
      )}
      <button
        type="submit"
        className={`btn primary ${styles.formulaireSubmit}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'ENVOI EN COURS...' : 'ENVOYER'}
      </button>
    </form>
  );
}

export default function Formulaire() {

  return (
    <section id="contact-form" className={`section ${styles.formulaireSection}`}>
      <CloudRed top="23%" right="-25%" width="900px" height="650px" zIndex={1} />
      <div className={`container ${styles.formulaireContainer}`}>
        <div className={styles.formulaireHeader}>
          <h2 className={styles.formulaireTitle}>FORMULAIRE LEAD</h2>
          <p className={styles.formulaireDescription}>
            Vous avez un projet immobilier ou souhaitez obtenir plus d&apos;informations sur nos programmes
            disponibles ? Laissez-nous vos coordonnées, un conseiller EM IMMO vous contactera
            rapidement pour vous accompagner.
          </p>
        </div>
        <div className={styles.formulaireGrid}>
          <div className={styles.formulaireLeft}>
            <div className={styles.formulaireImageWrapper}>
              <Image
                src={leadFormImg}
                alt="Résidence moderne EM IMMO - Projet immobilier à Marrakech"
                width={800}
                height={600}
                className={styles.formulaireImage}
                quality={85}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className={styles.formulaireRight}>
            <div className={styles.formulairePanel}>
              <LeadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

