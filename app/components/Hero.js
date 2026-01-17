"use client";

import Image from "next/image";
import CloudRed from "./CloudRed";
import styles from "./Hero.module.css";

export default function Hero() {
// Fonction pour rediriger vers WhatsApp
  const handleWhatsAppClick = () => {
    const phoneNumber = "+212663871596";
    const whatsappNumber = phoneNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent("Bonjour, je souhaite obtenir plus d'informations sur vos projets immobiliers.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };
  const heroImg = "/imglanding/IMG_1589 copy.png";
  
const heroHighlights = [
  "Promoteurs\nvérifiés",
  "Photos chantier\n+ suivi mensuel",
  "Paiements\npar étapes",
  "Achat possible à distance (MRE)",
];

  return (
     <section id="accueil" className={styles.hero}>
               <CloudRed top="10%" left="-20%" width="800px" height="600px" zIndex={1} opacity={0.6} />
               <CloudRed top="40%" right="2.5%" width="850px" height="750px" zIndex={2} />
               <CloudRed top="95%" right="75%" width="900px" height="600px" zIndex={6} opacity={0.6} />
               <div className={styles.heroContentWrapper}>
                 <div className={styles.heroGrid}>
                   <div className={styles.heroGridFirstChild}>
                     <div>
                       <h1 className={styles.heroTitle}>
                         ACHETEZ SUR PLAN <br />
                         À MARRAKECH EN TOUTE <span className={styles.accent}>CONFIANCE.</span> <br />
                       </h1>
                       <p className={styles.heroLead}>
                         Projets sélectionnés, paiements progressifs, suivi chantier et accompagnement complet jusqu&apos;à la remise des clés.
                       </p>
                       <div className={`${styles.heroActions} ${styles.whatsappButtonsGroup}`}>
                         <button className="cta whatsapp-icon-only" onClick={handleWhatsAppClick}>
                           <span className="icon-square icon-square-red">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                             </svg>
                           </span>
                         </button>
                         <button className="cta whatsapp-text-only" onClick={handleWhatsAppClick}>
                           <span>WhatsApp immédiat</span>
                         </button>
                       </div>
                     </div>
                     <div className={styles.heroBadges}>
                       {heroHighlights.map((item, index) => (
                         <div key={item} className={`${styles.heroBadge} ${styles[`heroBadge${index + 1}`]}`}>
                           <span className={styles.checkmarkStar}>
                             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                               <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z"/>
                             </svg>
                           </span>
                           <span>{item}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div className={styles.heroImage}>
                     <Image 
                       src={heroImg} 
                       alt="Projet immobilier EM IMMO" 
                       fill
                       priority 
                       quality={95}
                       sizes="60vw"
                       style={{ objectFit: "cover", objectPosition: "center" }}
                     />
                   </div>
                 </div>
               </div>
             </section>
  );
}

