"use client";



export default function Publicité() {
 
  return (
    {/* Section NOUS VOUS PROPOSONS DES MOYENS SIMPLES D'INVESTIR DANS L'IMMOBILIER */}
        <section className="section investment-cta-section-services">
          <div className="container investment-cta-container">
            <h2 className="investment-cta-title">
              NOUS VOUS PROPOSONS DES MOYENS SIMPLES D&apos;INVESTIR DANS L&apos;IMMOBILIER
            </h2>
            <button className="btn investment-cta-btn" onClick={scrollToForm}>
              <span className="icon-square icon-square-white">
                <span className="material-symbols-outlined">phone</span>
              </span>
              <span>Être Rappelé En 24h</span>
            </button>
          </div>
        </section>
  );
}

