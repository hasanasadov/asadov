import { useEffect } from "react";

export default function useSlowScroll(
  smoothness: number = 0.12,
  sensitivity: number = 0.4
) {
  useEffect(() => {
    let scrollTimeout: number | null = null;
    let targetScroll = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Adjust sensitivity for slower/faster scroll (lower = slower)
      targetScroll += e.deltaY * sensitivity;
      // Clamp target scroll to [0, max]
      targetScroll = Math.max(
        0,
        Math.min(document.body.scrollHeight - window.innerHeight, targetScroll)
      );
      smoothScroll();
    };

    const smoothScroll = () => {
      const difference = targetScroll - window.scrollY;
      if (Math.abs(difference) > 1) {
        window.scrollBy(0, difference * smoothness); // lower smoothness = smoother
        scrollTimeout = requestAnimationFrame(smoothScroll);
      } else {
        window.scrollTo(0, targetScroll);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
    };
  }, [smoothness, sensitivity]);
}
