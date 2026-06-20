import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Collection from "./components/Collection";
import LiveStats from "./components/LiveStats";
import Atelier from "./components/Atelier";
import Process from "./components/Process";
import Marquee2 from "./components/Marquee2";
import Looks from "./components/Looks";
import Lookbook from "./components/Lookbook";
import Showrooms from "./components/Showrooms";
import Manifesto from "./components/Manifesto";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  return (
    <div className="grain bg-ink min-h-screen text-bone antialiased overflow-x-hidden w-full relative">
      <SmoothScroll>
        <Cursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Collection />
          <LiveStats />
          <Atelier />
          <Process />
          <Marquee2 />
          <Looks />
          <Lookbook />
          <Showrooms />
          <Manifesto />
          <Testimonials />
          <Newsletter />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  );
}
