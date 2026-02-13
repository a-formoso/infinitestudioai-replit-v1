import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const SCROLL_STORAGE_PREFIX = "scroll_pos_";
const EXPIRY_MS = 30 * 60 * 1000;

interface ScrollEntry {
  y: number;
  timestamp: number;
}

export function useScrollRestoration(isLoggedIn: boolean | undefined) {
  const [location] = useLocation();
  const key = SCROLL_STORAGE_PREFIX + location;
  const hasRestored = useRef(false);

  useEffect(() => {
    hasRestored.current = false;
  }, [location]);

  useEffect(() => {
    if (isLoggedIn === undefined || hasRestored.current) return;
    hasRestored.current = true;

    const saved = sessionStorage.getItem(key);
    if (isLoggedIn && saved) {
      try {
        const entry: ScrollEntry = JSON.parse(saved);
        if (Date.now() - entry.timestamp < EXPIRY_MS) {
          window.scrollTo(0, entry.y);
          return;
        }
      } catch {}
    }
    window.scrollTo(0, 0);
  }, [location, isLoggedIn, key]);

  useEffect(() => {
    if (!isLoggedIn) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const entry: ScrollEntry = { y: window.scrollY, timestamp: Date.now() };
          sessionStorage.setItem(key, JSON.stringify(entry));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location, isLoggedIn, key]);
}
