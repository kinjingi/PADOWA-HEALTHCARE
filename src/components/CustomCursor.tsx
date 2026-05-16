"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Inner dot: Instant, precise hardware-like tracking
  const dotX = useSpring(mouseX, { stiffness: 3000, damping: 80 });
  const dotY = useSpring(mouseY, { stiffness: 3000, damping: 80 });

  // Outer ring: Soft, luxury floating trail
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("hover-trigger")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand-orange rounded-full pointer-events-none z-[100] mix-blend-multiply"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-brand-cyan rounded-full pointer-events-none z-[99]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(6, 182, 212, 0.1)" : "rgba(0, 0, 0, 0)",
        }}
      />
    </>
  );
}
