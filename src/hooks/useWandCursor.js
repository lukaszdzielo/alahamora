'use client';

import { useEffect, useRef } from 'react';

/**
 * Różdżka jako kursor (jak na płótnie):
 * - różdżka podąża za myszą i lekko przechyla się w stronę ruchu,
 * - wokół czubka miękkie światło (Lumos) oświetla stronę,
 * - z czubka sypią się opyłki – iskry, które opadają i gasną.
 * Zwraca refy: wand (różdżka), tilt (element przechylany), glow (światło), sparks (pojemnik na iskry).
 * Na ekranach dotykowych i przy „ogranicz ruch” nic nie robi (zostaje zwykły kursor).
 */
const SPARK_EVERY_MS = 45;
const SPARK_LIFE_MS = 950;

export default function useWandCursor() {
  const wandRef = useRef(null);
  const tiltRef = useRef(null);
  const glowRef = useRef(null);
  const sparksRef = useRef(null);

  useEffect(() => {
    const wand = wandRef.current;
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    const sparks = sparksRef.current;
    if (!wand || !window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let x = -200;
    let y = -200;
    let lastX = null;
    let angle = 0;
    let lastSpark = 0;

    const render = () => {
      frame = 0;
      wand.style.translate = `${x}px ${y}px`;
      tilt.style.rotate = `${angle.toFixed(1)}deg`;
      glow.style.translate = `${x}px ${y}px`;
    };

    const spawnSpark = () => {
      const spark = document.createElement('span');
      spark.className = 'wand-spark';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty('--dx', `${((Math.random() - 0.5) * 40).toFixed(0)}px`);
      spark.style.setProperty('--dy', `${(10 + Math.random() * 34).toFixed(0)}px`);
      spark.style.setProperty('--size', `${(2.5 + Math.random() * 2.5).toFixed(1)}px`);
      sparks.appendChild(spark);
      setTimeout(() => spark.remove(), SPARK_LIFE_MS);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;

      // przechył w stronę ruchu (wygładzony)
      const vx = lastX == null ? 0 : x - lastX;
      lastX = x;
      angle = angle * 0.7 + Math.max(-14, Math.min(14, vx * 1.2)) * 0.3;

      // nad nieaktywnym linkiem chowamy różdżkę i zostawiamy systemowy kursor „zakaz”
      const blocked = event.target instanceof Element && event.target.closest('[aria-disabled="true"]');
      const visible = blocked ? 'false' : 'true';
      wand.dataset.visible = visible;
      glow.dataset.visible = visible;

      const now = performance.now();
      if (!blocked && now - lastSpark > SPARK_EVERY_MS) {
        lastSpark = now;
        spawnSpark();
      }

      if (!frame) frame = requestAnimationFrame(render);
    };

    const onLeave = () => {
      wand.dataset.visible = 'false';
      glow.dataset.visible = 'false';
      lastX = null;
    };

    document.documentElement.classList.add('has-wand');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    // sprzątanie – ważna część pracy z useEffect
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-wand');
      sparks.replaceChildren();
    };
  }, []);

  return { wandRef, tiltRef, glowRef, sparksRef };
}
