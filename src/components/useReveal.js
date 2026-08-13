import { useEffect, useRef } from "react";

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal");
          void el.offsetWidth; // Restart animation
          el.classList.add("reveal");
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}






