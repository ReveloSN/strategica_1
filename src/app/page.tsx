import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import SuccessCases from "../components/SuccessCases";
import Team from "../components/Team";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <SuccessCases />
      <Team />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
