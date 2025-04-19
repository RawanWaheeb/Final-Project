


import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AboutSection from "./aboutSection/AboutSection";
import CategorySection from "./categorySection/CategorySection";
import ContactSection from "./contactSection/ContactSection";
import FeatureSection from "./featureSection/FeatureSection";
import HeroSection from "./heroSection/heroSection";
import PlantHealthFeature from "./plantHealthFeatureSection/PlantHealthFeature";
import { ReviewSection } from "./reviewSection/ReviewSection";
import SREA from "./sreaSection/SREA";
import { Helmet } from "react-helmet";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>

    <Helmet>
        <title>GroVana</title>
        <meta name="description" content="home page " />
      </Helmet>
      <div className="pt-5">
  <section id="home" className="h-auto px-6 py-16">
    <HeroSection />
  </section>

  <section className="py-16">
    <FeatureSection />
  </section>

  <section id="shop" className="py-16 flex flex-col items-center md:flex-row md:items-start justify-center">
    <CategorySection />
  </section>

  <section id="about_us" className="py-16 flex flex-col items-center md:flex-row md:items-start justify-center">
    <AboutSection />
  </section>

  <section id="ai_help" className="py-16 flex flex-col items-center md:flex-row md:items-start justify-center">
    <PlantHealthFeature />
  </section>

  <section id="content" className="py-16 flex flex-col items-center md:flex-row md:items-start justify-center">
    <ContactSection />
  </section>

  <section id="review" className="py-16 flex flex-col items-center md:flex-row md:items-start justify-center">
    <ReviewSection />
  </section>
</div>

    </>
  );
}














