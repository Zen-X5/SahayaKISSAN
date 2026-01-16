import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import "./AfterHeroSections.css";

export default function AfterHeroSections() {
  const { t } = useTranslation();

  return (
    <section className="after-hero">

      <div className="section-row">
        <Reveal>
          <div className="section-text">
            <h2>{t("afterHero.whoWeAre.title")}</h2>
            <p>{t("afterHero.whoWeAre.p1")}</p>
            <p>{t("afterHero.whoWeAre.p2")}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-image">
            <img
              src="/images/who-we-are.avif"
              alt={t("afterHero.whoWeAre.imageAlt")}
            />
          </div>
        </Reveal>
      </div>

      <div className="section-row reverse">
        <Reveal>
          <div className="section-text">
            <h2>{t("afterHero.whyMatters.title")}</h2>
            <p>{t("afterHero.whyMatters.p1")}</p>
            <p>{t("afterHero.whyMatters.p2")}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="section-image">
            <img
              src="https://pandawaid.com/wp-content/uploads/2024/04/Sustainability-Report-2023_Thumbnail.jpeg"
              alt={t("afterHero.whyMatters.imageAlt")}
              style={{
                width: "100%",
                height: "420px",
                objectFit: "contain",
                backgroundColor: "#f2f7f3"
              }}
            />
          </div>
        </Reveal>
      </div>

      <Reveal>
    <div className="enable-section">
      <div className="section-header">
        <h2>{t("afterHero.enable.title")}</h2>
        <p>{t("afterHero.enable.subtitle")}</p>
      </div>

      <div className="enable-grid">
        <div className="enable-card">
          <img 
            src="/images/agroAI.png"
            alt="Sustainable Farming"
            className="card-hero-image"
            style={{
              width: "100%",
              height: "260px",
              objectFit: "contain",
              backgroundColor: "#f2f7f3",
              padding: "12px",
              borderRadius: "12px"
            }}
          />

          <div className="card-content">
            <h3>{t("afterHero.enable.cards.smart.title")}</h3>
            <p>{t("afterHero.enable.cards.smart.desc")}</p>
          </div>
        </div>

        <div className="enable-card">
          <img 
            src="/images/agroSchemes.jpg"
            alt="Sustainable Farming"
            className="card-hero-image"
            style={{
              width: "100%",
              height: "260px",
              objectFit: "contain",
              backgroundColor: "#f2f7f3",
              padding: "12px",
              borderRadius: "12px"
            }}
          />

          <div className="card-content">
            <h3>{t("afterHero.enable.cards.schemes.title")}</h3>
            <p>{t("afterHero.enable.cards.schemes.desc")}</p>
          </div>
        </div>

        <div className="enable-card">
          <img 
            src="/images/agroAdoption.png"
            alt="Sustainable Farming"
            className="card-hero-image"
            style={{
              width: "100%",
              height: "260px",
              objectFit: "contain",
              backgroundColor: "#f2f7f3",
              padding: "12px",
              borderRadius: "12px"
            }}
          />

          <div className="card-content">
            <h3>{t("afterHero.enable.cards.tech.title")}</h3>
            <p>{t("afterHero.enable.cards.tech.desc")}</p>
          </div>
        </div>

        <div className="enable-card">
          <img 
            src="/images/sustainable.png  "
            alt="Sustainable Farming"
            className="card-hero-image"
            style={{
              width: "100%",
              height: "260px",
              objectFit: "contain",
              backgroundColor: "#f2f7f3",
              padding: "12px",
              borderRadius: "12px"
            }}
          />

        <div className="card-content">
          <h3>{t("afterHero.enable.cards.sustain.title")}</h3>
          <p>{t("afterHero.enable.cards.sustain.desc")}</p>
        </div>
      </div>
    </div>
  </div>
</Reveal>


    </section>
  );
}
