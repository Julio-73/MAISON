import { lazy, Suspense } from "react";
import { useT } from "./i18n";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import CheckoutModal from "./components/CheckoutModal";
import MadeToMeasure from "./components/MadeToMeasure";
import AppointmentCalendar from "./components/AppointmentCalendar";
import ToastContainer from "./components/Toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Marquee = lazy(() => import("./components/Marquee"));
const Collection = lazy(() => import("./components/Collection"));
const Lookbook = lazy(() => import("./components/Lookbook"));
const Looks = lazy(() => import("./components/Looks"));
const Atelier = lazy(() => import("./components/Atelier"));
const Process = lazy(() => import("./components/Process"));
const Manifesto = lazy(() => import("./components/Manifesto"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const LiveStats = lazy(() => import("./components/LiveStats"));
const Marquee2 = lazy(() => import("./components/Marquee2"));
const Showrooms = lazy(() => import("./components/Showrooms"));
const Contact = lazy(() => import("./components/Contact"));
const Newsletter = lazy(() => import("./components/Newsletter"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const t = useT();
  return (
    <SmoothScroll>
      <a href="#main-content" className="skip-link">{t("skip")}</a>
      <Cursor />
      <ScrollProgress />
      <Loader />
      <div className="bg-ink min-h-screen text-bone overflow-x-hidden">
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <MadeToMeasure />
        <AppointmentCalendar />
        <ToastContainer />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Suspense fallback={null}><Marquee dark /></Suspense>
          <Suspense fallback={null}><Collection /></Suspense>
          <Suspense fallback={null}><Marquee /></Suspense>
          <Suspense fallback={null}><Lookbook /></Suspense>
          <Suspense fallback={null}><Looks /></Suspense>
          <Suspense fallback={null}><Atelier /></Suspense>
          <Suspense fallback={null}><Process /></Suspense>
          <Suspense fallback={null}><Manifesto /></Suspense>
          <Suspense fallback={null}><Testimonials /></Suspense>
          <Suspense fallback={null}><LiveStats /></Suspense>
          <Suspense fallback={null}><Marquee2 /></Suspense>
          <Suspense fallback={null}><Showrooms /></Suspense>
          <Suspense fallback={null}><Contact /></Suspense>
          <Suspense fallback={null}><Newsletter /></Suspense>
          <Suspense fallback={null}><Footer /></Suspense>
        </main>
      </div>
    </SmoothScroll>
  );
}
