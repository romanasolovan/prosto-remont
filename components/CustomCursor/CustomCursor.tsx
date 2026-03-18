"use client";

import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

type CursorState = "default" | "hover" | "card";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<CursorState>("default");
  const pos = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isCoarsePointer) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    document.documentElement.classList.add(styles.cursorEnabled);

    const setCursorState = (nextState: CursorState) => {
      if (!cursor || stateRef.current === nextState) return;

      cursor.classList.remove(styles.default, styles.hover, styles.card);
      cursor.classList.add(styles[nextState]);
      stateRef.current = nextState;

      label.textContent = nextState === "card" ? "View" : "";
    };

    const onMove = (event: MouseEvent) => {
      pos.current.x = event.clientX;
      pos.current.y = event.clientY;

      if (!visible.current) {
        cur.current.x = event.clientX;
        cur.current.y = event.clientY;
        cursor.style.opacity = "1";
        visible.current = true;
      }
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target) return;

      if (target.closest("[data-cursor-card]")) {
        setCursorState("card");
        return;
      }

      if (target.closest("button, a, [role='button']")) {
        setCursorState("hover");
        return;
      }

      setCursorState("default");
    };

    const onLeaveWindow = () => {
      cursor.style.opacity = "0";
      visible.current = false;
    };

    const animate = () => {
      const ease = prefersReducedMotion ? 1 : 0.22;

      cur.current.x += (pos.current.x - cur.current.x) * ease;
      cur.current.y += (pos.current.y - cur.current.y) * ease;

      cursor.style.transform = `translate3d(${cur.current.x - 6}px, ${cur.current.y - 6}px, 0)`;

      raf.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget) onLeaveWindow();
    });
    window.addEventListener("blur", onLeaveWindow);

    raf.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("blur", onLeaveWindow);
      document.documentElement.classList.remove(styles.cursorEnabled);

      if (raf.current) {
        window.cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles.default}`}
      aria-hidden="true"
    >
      <div className={styles.cross} />
      <div className={styles.ring} />
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
