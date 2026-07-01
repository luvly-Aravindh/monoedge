import { useState, useRef } from 'react';

import { useUrlPrefill } from './hooks/useUrlPrefill.js';
import { useReveal } from './hooks/useReveal.js';
import { useHeroParallax } from './hooks/useHeroParallax.js';

import Background from './components/Background.jsx';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import TopBand from './components/TopBand.jsx';
import Hero from './components/Hero.jsx';
import TrustStrip from './components/TrustStrip.jsx';
import IndustryStrip from './components/IndustryStrip.jsx';
import PlantMarquee from './components/PlantMarquee.jsx';
import ProblemPattern from './components/ProblemPattern.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import CtaBand from './components/CtaBand.jsx';
import BeforeAfter from './components/BeforeAfter.jsx';
import BiggerIdea from './components/BiggerIdea.jsx';
import Capabilities from './components/Capabilities.jsx';
import ProofReviews from './components/ProofReviews.jsx';
import Promise from './components/Promise.jsx';
import Faq from './components/Faq.jsx';
import SiteFooter from './components/SiteFooter.jsx';
import BookingModal from './components/BookingModal.jsx';
import ProofTicker from './components/ProofTicker.jsx';
import StickyBar from './components/StickyBar.jsx';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const prefill = useUrlPrefill();

  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const g1Ref = useRef(null);
  const g2Ref = useRef(null);

  useReveal();
  useHeroParallax({ heroRef, sceneRef, g1Ref, g2Ref });

  const onOpen = () => setModalOpen(true);
  const onClose = () => setModalOpen(false);

  return (
    <div className="contents">
      <noscript>
        <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <Background g1Ref={g1Ref} g2Ref={g2Ref} />
      <AnnouncementBar />
      <TopBand />

      <Hero heroRef={heroRef} sceneRef={sceneRef} prefill={prefill} onOpen={onOpen} />
      <TrustStrip />
      <IndustryStrip />
      <PlantMarquee />
      <ProblemPattern onOpen={onOpen} />
      <HowItWorks />

      <CtaBand
        title="See it on your own data."
        body="Bring one real export from your plant. Watch Business Brain read it live and surface the first insight, usually in under a minute."
        micro={<>Bring one export. See a real insight in under <span className="pop">1 minute</span>.</>}
        onOpen={onOpen}
      />

      <BeforeAfter onOpen={onOpen} />
      <BiggerIdea />
      <Capabilities onOpen={onOpen} />
      <ProofReviews onOpen={onOpen} />
      <Promise onOpen={onOpen} />
      <Faq />

      <CtaBand
        title="See what is hiding in your own numbers."
        body="Book a 30 minute demo on your own plant data and watch Business Brain read it live."
        micro={<>Only <span className="pop">6</span> demo slots open this month.</>}
        onOpen={onOpen}
      />

      <SiteFooter />

      <BookingModal open={modalOpen} onClose={onClose} prefill={prefill} />
      <ProofTicker />
      <StickyBar onOpen={onOpen} />
    </div>
  );
}
