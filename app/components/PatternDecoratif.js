"use client";

import styles from "./PatternDecoratif.module.css";

export default function PatternDecoratif() {
  return (
    <div className={styles.patternContainer}>
      <div className={styles.patternWrapper}>
        <img 
          src="/image.png" 
          alt="Pattern décoratif" 
          width={1920} 
          height={200} 
          className={styles.patternImage}
        />
        <div className={styles.patternGradient} />
      </div>
    </div>
  );
}




