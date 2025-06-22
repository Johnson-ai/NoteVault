import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      
      {/* Scroll snapping container */}
      <main 
        className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory" 
        style={{ scrollBehavior: "smooth" }}
      >
        <section id="hero" className="snap-start min-h-screen flex flex-col justify-center">
          <Hero />
        </section>

        <section id="features" className="snap-start min-h-screen flex flex-col justify-center">
          <Features />
        </section>

        <section id="about" className="snap-start min-h-screen flex flex-col justify-center">
          <About />
        </section>

        <section id="contact" className="snap-start min-h-screen flex flex-col justify-center">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LandingPage;
