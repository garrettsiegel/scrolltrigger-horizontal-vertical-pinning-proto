import { useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import "./App.css"
gsap.registerPlugin(ScrollTrigger)

export function App() {
  const horizontalSectionRef1 = useRef(null)
  const horizontalSectionRef2 = useRef(null)

  useEffect(() => {
    const sections = [
      { ref: horizontalSectionRef1, trigger: ".horiz-section-1" },
      { ref: horizontalSectionRef2, trigger: ".horiz-section-2" },
    ]

    sections.forEach(({ ref, trigger }) => {
      const horizontalSection = ref.current
      if (!horizontalSection) return

      function getScrollAmount() {
        return -(horizontalSection.scrollWidth - window.innerWidth)
      }

      const tween = gsap.to(horizontalSection, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
      })

      ScrollTrigger.create({
        trigger,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section>
      <div className="horiz-section-1">
        <div className="horiz-section" ref={horizontalSectionRef1}>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
        </div>
      </div>

      <div className="vert-section">
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
      </div>

      <div className="horiz-section-2">
        <div className="horiz-section" ref={horizontalSectionRef2}>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
          <div className="horiz-box">horizontal section</div>
        </div>
      </div>

      <div className="vert-section">
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
        <div className="vert-box">vertical section</div>
      </div>
    </section>
  )
}
