import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from 'lenis'

const lenis = new Lenis({
  autoRaf: true,
});

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    lenis.scrollTo(0);
    console.log("Pathname changed:", pathname);
  }, [pathname]);

  return null;
}
