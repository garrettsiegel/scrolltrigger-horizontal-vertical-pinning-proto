import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const racesRef1 = useRef(null);
  const racesRef2 = useRef(null);

  useEffect(() => {
    const sections = [
      { ref: racesRef1, trigger: ".racesWrapper1" },
      { ref: racesRef2, trigger: ".racesWrapper2" },
    ];

    sections.forEach(({ ref, trigger }) => {
      const races = ref.current;
      if (!races) return;

      function getScrollAmount() {
        return -(races.scrollWidth - window.innerWidth);
      }

      const tween = gsap.to(races, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section>

      <div className="racesWrapper racesWrapper1">
        <div className="races" ref={racesRef1}>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
        </div>
      </div>

      <div className="space-100vh lightBG">
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
      </div>

      <div className="racesWrapper racesWrapper2">
        <div className="races" ref={racesRef2}>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
          <div className="h-box">horizontal section</div>
        </div>
      </div>

      <div className="space-100vh lightBG">
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
        <div className="v-box">vertical section</div>
      </div>

    </section>
  );
}
