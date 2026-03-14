"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

type CursorState = "default" | "hover" | "card";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const pos = useRef({ x: -100, y: -100 });
  const cur = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("[data-cursor-card]")) setState("card");
      else if (target.closest("button, a, [role='button']")) setState("hover");
      else setState("default");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.14;
      cur.current.y += (pos.current.y - cur.current.y) * 0.14;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cur.current.x - 6}px, ${cur.current.y - 6}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Only show on non-touch devices
  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[state]}`}
      aria-hidden="true"
    >
      <div className={styles.cross} />
      <div className={styles.ring} />
      <span className={styles.label}>View</span>
    </div>
  );
}
