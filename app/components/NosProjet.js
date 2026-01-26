"use client";

// Imports simplifiés - logique du carousel supprimée
import Image from "next/image";
import Link from "next/link";
import CloudRed from "./CloudRed";
import styles from "./NosProjets.module.css";

const zoomIcon = "/icons/zoom.svg";
const arrowDownwardIcon = "/icons/arrow_downward.svg";

const gardenImg = "/imglanding/5w.webp";
const patioImg = "/imglanding/11.webp";

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
];

export default function NosProjets() {
  // Logique du carousel supprimée car les projets sont maintenant affichés en colonne statique

  return (
    <section id="projets" className={`section ${styles.projetsSection}`}>
      <CloudRed top="10%" right="-30%" width="800px" height="350px" zIndex={1} />
      <CloudRed bottom="30%" left="-30%" width="800px" height="700px" zIndex={1} />
      <div className="container">
        <div className={styles.projectsSectionHeader}>
          <h2>Nos projets disponibles sur plan</h2>
          <p className={styles.projectsSubtitle}>
            Découvrez nos projets immobiliers sur plan à Marrakech, sélectionnés pour leur qualité, leur
            emplacement stratégique et leur potentiel de valorisation. EM IMMO vous accompagne dans un
            achat sécurisé, transparent et rentable, que vous soyez sur place ou à distance.
          </p>
        </div>
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`${styles.projectItem} ${styles.projectItemHorizontal} ${project.imagePosition === 'left' ? styles.imageLeft : styles.imageRight}`}
            >
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}<span className={styles.projectSubtitle}> {project.subtitle}</span></h3>
                <ul className={styles.projectFeatures}>
                  {project.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
                <Link href={
                  project.title === "PATIO" ? "/patio" :
                  project.title === "GOLD GARDEN" ? "/gold-garden" :
                  "/#projets"
                }>
                  <button className={`btn primary ${styles.projectAction}`}>
                    <span className="icon-square icon-square-white">
                      <Image src={zoomIcon} alt="" width={25} height={25} style={{ display: 'block', opacity: 1 }} />
                    </span>
                    <span>{project.action}</span>
                  </button>
                </Link>
              </div>
              <div className={styles.projectImageWrapper}>
                <button className={styles.projectDownloadBtn} aria-label="Télécharger plans & brochure">
                  <Image src={arrowDownwardIcon} alt="Télécharger" width={24} height={24} />
                </button>
                <div className={styles.downloadText}>Télécharger plans & brochure</div>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  width={1200} 
                  height={1600} 
                  className={styles.projectImage}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

