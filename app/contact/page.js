"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CloudRed from "../components/CloudRed";
import emailjs from '@emailjs/browser';
import { supabase } from "../../lib/supabase";
import "./style.css";

const footerLogoImg = "/logos/asset-6.png";
const brandIconImg = "/logos/brand-icon-1.png";

export default function ContactPage() {
  const phoneNumber = "+212663871596";
  const email = "immobilier@entrepreneursmorocco.com";
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}`;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ type: null, message: '' });

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // Initialiser EmailJS au chargement du composant
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

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
      // 1. Envoyer par EmailJS avec le template de contact
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      // Template spécifique pour le formulaire de contact
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (serviceId && templateId && publicKey) {
        const templateParams = {
          from_name: formData.nom,
          from_email: formData.email,
          from_phone: formData.telephone,
          subject: formData.sujet || 'Message depuis le formulaire de contact',
          message: formData.message,
          to_name: 'EM IMMO',
          date: new Date().toLocaleString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          source: 'Formulaire de contact',
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('EmailJS envoyé avec succès (Contact)');
      } else {
        console.warn('EmailJS non configuré - variables manquantes');
      }

      // 2. Enregistrer dans Supabase
      if (supabase) {
        try {
          const { data, error: supabaseError } = await supabase
            .from('leads')
            .insert([
              {
                nom: formData.nom,
                telephone: formData.telephone,
                email: formData.email,
                projet: formData.sujet || 'Contact général',
                message: formData.message,
                source: 'contact_form',
                created_at: new Date().toISOString()
              }
            ])
            .select();

          if (supabaseError) {
            console.error('Erreur Supabase (non bloquante):', supabaseError);
          } else {
            console.log('Contact enregistré dans Supabase avec succès:', data);
          }
        } catch (supabaseErr) {
          console.error('Erreur Supabase (non bloquante):', supabaseErr);
        }
      } else {
        console.warn('Supabase non configuré');
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.' 
      });
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
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
    <div className="contact-page">
      {/* Bouton WhatsApp flottant */}
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
        </svg>
      </a>

      <main className="contact-main">
        <CloudRed top="5%" left="-18%" width="750px" height="750px" zIndex={0} opacity={0.45} color="red" />
        <CloudRed top="45%" right="-15%" width="680px" height="680px" zIndex={0} opacity={0.4} color="red" />
        <CloudRed top="75%" left="-16%" width="720px" height="720px" zIndex={0} opacity={0.35} color="red" />
        
        <div className="container">
          <div className="contact-content">
            <div >
                   <h2 className="titleSection">Parlons de votre projet</h2>
                   <p  className="contentSectionContact">
Entrepreneurs, porteurs de projets et entreprises au Maroc, nous vous accompagnons à chaque étape de votre développement. <br/>
Contactez-nous pour discuter de vos besoins, obtenir un devis ou bénéficier d’un accompagnement personnalisé.                   </p>
                 </div>
            <div className="contact-wrapper">
              <div className="contact-form-section">
                <h2>Contactez-nous</h2>
                <p className="contact-subtitle">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label htmlFor="nom">Nom complet</label>
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        placeholder="Votre nom"
                        className="contact-form-input"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="contact-form-field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="votre@email.com"
                        className="contact-form-input"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label htmlFor="telephone">Téléphone</label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        placeholder="+212 6XX XXX XXX"
                        className="contact-form-input"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="contact-form-field">
                      <label htmlFor="sujet">Sujet</label>
                      <input
                        type="text"
                        id="sujet"
                        name="sujet"
                        placeholder="Objet de votre message"
                        className="contact-form-input"
                        value={formData.sujet}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-field">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Votre message..."
                      className="contact-form-textarea"
                      rows="6"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {submitStatus.message && (
                    <div className={`contact-form-status ${submitStatus.type}`}>
                      {submitStatus.message}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn primary contact-form-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'ENVOI...' : 'Envoyer le message'}
                  </button>
                </form>
              </div>

              <div className="contact-info-section">
                <h2>Informations de contact</h2>
                
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Téléphone</h3>
                    <a href={`tel:${phoneNumber}`} className="contact-info-link">
                      {phoneNumber}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Email</h3>
                    <a href={`mailto:${email}`} className="contact-info-link">
                      {email}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Localisation</h3>
                    <p className="contact-info-text">Marrakech, Maroc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}
