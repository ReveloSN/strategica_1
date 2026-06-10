"use client";

import { useCallback, useEffect, useState } from "react";
import Contact from "./Contact";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Portfolio from "./Portfolio";
import Services from "./Services";

export default function HomeShell() {
  const [showServices, setShowServices] = useState(false);
  const [servicesOpenSignal, setServicesOpenSignal] = useState(0);

  const openServices = useCallback(() => {
    setShowServices(true);
    setServicesOpenSignal((signal) => signal + 1);
  }, []);

  useEffect(() => {
    if (!showServices) {
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector("#services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [servicesOpenSignal, showServices]);

  const closeServices = useCallback(() => {
    setShowServices(false);
  }, []);

  return (
    <main>
      <Navbar onServicesClick={openServices} servicesActive={showServices} />
      <Hero />
      <Portfolio />
      {showServices && <Services onClose={closeServices} />}
      <Contact />
      <Footer />
    </main>
  );
}
