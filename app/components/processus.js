"use client";

import Image from "next/image";
import styles from "./processus.module.css";

const phoneIcon = "/icons/phone.svg";

const timeline = [
  "Appel découverte",
  "Visite chantier / visio",
  "Signature notaire",
  "Paiements progressifs",
  "Suivi chantier + reporting",
  "Livraison + remise clés",
];


  // Fonction pour scroller vers le formulaire
  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

export default function Processus() {
 
  return (
     
             <section id="apropos" className={`section ${styles.processSection}`}>
               <div className="container">
                 <div className={`section-header ${styles.processSectionHeader}`}>
                   <h2 className="titleSection">Processus d'achat sur plan</h2>
                   <p className={styles.processSectionSubtitle}>
                     Notre processus d&apos;achat sur plan est conçu pour sécuriser votre investissement immobilier, vous
                     offrir une visibilité totale et vous accompagner à chaque étape, même à distance.
                   </p>
                 </div>
                 <div className={styles.processStepsCarousel}>
                   <div className={styles.processStepsContainer}>
                     {timeline.map((step, index) => (
                       <div key={step} className={styles.processStep}>
                         <div className={styles.processStepNumber}>
                           {String(index + 1).padStart(2, '0')}
                         </div>
                         <div className={styles.processStepText}>{step.toUpperCase()}</div>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className={styles.processCta}>
                   <button className={`btn primary ${styles.processCtaBtn}`} onClick={scrollToForm}>
                     <span className="icon-square icon-square-white">
                       <Image src={phoneIcon} alt="Téléphone" width={24} height={24} />
                     </span>
                     <span>Planifier Mon Appel</span>
                   </button>
                 </div>
               </div>
             </section>
  );
}

