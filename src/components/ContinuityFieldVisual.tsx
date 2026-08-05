"use client";

import { useEffect, useRef } from "react";

const FIELD_GLYPHS = "NEPTUNE27B01{}[]<>/\\|:=+*#?;";
const CORE_GLYPHS = "NEPTUNE27B{}[]<>/\\|:=+*#@";

type Point3 = readonly [number, number, number];

type LoopParticle = {
  position: number;
  spread: number;
  ringAngle: number;
  phase: number;
  glyphOffset: number;
  weight: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number, seed: number) {
  let value = Math.imul(x + seed * 101, 374761393) + Math.imul(y + seed * 47, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function createParticles(total: number): LoopParticle[] {
  return Array.from({ length: total }, (_, index) => ({
    position: (index + noise(index, 1, 7) * 0.86) / total,
    spread: Math.sqrt(noise(index, 2, 11)),
    ringAngle: noise(index, 3, 17) * Math.PI * 2,
    phase: noise(index, 8, 41) * Math.PI * 2,
    glyphOffset: Math.floor(noise(index, 9, 43) * CORE_GLYPHS.length),
    weight: noise(index, 10, 47),
  }));
}

function normalize([x, y, z]: Point3): Point3 {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

function cross([ax, ay, az]: Point3, [bx, by, bz]: Point3): Point3 {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

function getLoopCenter(t: number, elapsed: number, morph: number): Point3 {
  const majorRadius = 0.76 + Math.cos(t * 3 + elapsed * 0.00032) * 0.13;
  const stretchX = 0.94 + morph * 0.18;
  const stretchY = 1.02 - morph * 0.12;
  const depth = 0.34 + (1 - morph) * 0.17;

  return [
    Math.cos(t * 2) * majorRadius * stretchX,
    Math.sin(t * 2) * majorRadius * stretchY,
    Math.sin(t * 3) * depth,
  ];
}

function resolveLoop(particle: LoopParticle, elapsed: number): Point3 {
  const morph = (Math.sin(elapsed * 0.00042) + 1) * 0.5;
  const flow = elapsed * 0.00004;
  const t = particle.position * Math.PI * 2 + flow;
  const center = getLoopCenter(t, elapsed, morph);
  const before = getLoopCenter(t - 0.002, elapsed, morph);
  const after = getLoopCenter(t + 0.002, elapsed, morph);
  const tangent = normalize([after[0] - before[0], after[1] - before[1], after[2] - before[2]]);
  const normal = normalize(cross(tangent, [0, 0, 1]));
  const binormal = normalize(cross(tangent, normal));
  const tubeRadius = (0.035 + particle.spread * 0.19) * (0.9 + morph * 0.14);
  const ringAngle = particle.ringAngle + elapsed * 0.00017;
  const ringX = Math.cos(ringAngle) * tubeRadius;
  const ringY = Math.sin(ringAngle) * tubeRadius;

  return [
    center[0] + normal[0] * ringX + binormal[0] * ringY,
    center[1] + normal[1] * ringX + binormal[1] * ringY,
    center[2] + normal[2] * ringX + binormal[2] * ringY,
  ];
}

export default function ContinuityFieldVisual() {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;

    if (!frame || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const fieldLayer = document.createElement("canvas");
    const fieldContext = fieldLayer.getContext("2d");
    let particles: LoopParticle[] = [];
    let isVisible = false;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let resizeFrame = 0;
    let revealStartedAt = performance.now();
    let lastPaintedAt = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let pixelRatio = 1;

    const paintField = () => {
      if (!fieldContext || cssWidth === 0 || cssHeight === 0) return;

      const step = cssWidth < 700 ? 9 : 11;
      const columns = Math.ceil(cssWidth / step);
      const rows = Math.ceil(cssHeight / step);

      fieldLayer.width = Math.round(cssWidth * pixelRatio);
      fieldLayer.height = Math.round(cssHeight * pixelRatio);
      fieldContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      fieldContext.clearRect(0, 0, cssWidth, cssHeight);
      fieldContext.font = `500 ${Math.max(6, step * 0.64)}px "IBM Plex Mono", monospace`;
      fieldContext.textAlign = "center";
      fieldContext.textBaseline = "middle";

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const random = noise(column, row, 59);
          if (random > 0.9) continue;

          const glyph = FIELD_GLYPHS[Math.floor(random * FIELD_GLYPHS.length) % FIELD_GLYPHS.length];
          const alpha = 0.018 + noise(column, row, 61) * 0.028;
          fieldContext.fillStyle = `rgba(214, 224, 241, ${alpha})`;
          fieldContext.fillText(glyph, (column + 0.5) * step, (row + 0.5) * step);
        }
      }
    };

    const drawFrame = (time: number, staticFrame = false) => {
      if (!staticFrame) {
        if (!isVisible || reduceMotion) return;
        animationFrame = requestAnimationFrame(drawFrame);
        if (time - lastPaintedAt < 38) return;
      }
      lastPaintedAt = time;

      const elapsed = staticFrame ? 4200 : Math.max(0, time - revealStartedAt);
      const reveal = staticFrame ? 1 : smoothstep(0, 1, elapsed / 1100);
      const rotationY = staticFrame ? 0.64 : elapsed * 0.00019;
      const rotationX = -0.22 + Math.sin(elapsed * 0.00025) * 0.11;
      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);
      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const compact = cssWidth < 700;
      const centerX = cssWidth * (compact ? 0.57 : 0.735);
      const centerY = cssHeight * (compact ? 0.315 : 0.5);
      const scale = Math.min(cssHeight * (compact ? 0.19 : 0.31), cssWidth * (compact ? 0.27 : 0.205));
      const glyphSize = compact ? 7.2 : 8.8;
      const glyphFrame = Math.floor(elapsed / 150);

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = 0.72;
      context.drawImage(fieldLayer, 0, 0);
      context.globalAlpha = 1;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const source = resolveLoop(particle, elapsed);
        const pulse = Math.sin(elapsed * 0.00115 + particle.phase) * 0.035;
        const x = source[0] * (1 + pulse);
        const y = source[1] * (1 + pulse);
        const z = source[2] * (1 + pulse);

        const rotatedX = x * cosY - z * sinY;
        const rotatedZ = x * sinY + z * cosY;
        const rotatedY = y * cosX - rotatedZ * sinX;
        const finalZ = y * sinX + rotatedZ * cosX;
        const perspective = 3.35 / (3.35 - finalZ);
        const screenX = centerX + rotatedX * scale * perspective;
        const screenY = centerY + rotatedY * scale * perspective;

        if (screenX < 0 || screenX > cssWidth || screenY < 0 || screenY > cssHeight) continue;

        const depth = clamp((finalZ + 1.35) / 2.7);
        const activation = smoothstep(0, 0.72, reveal - particle.weight * 0.34);
        const travelingSignal = (Math.sin(particle.position * Math.PI * 12 - elapsed * 0.002 + particle.phase * 0.18) + 1) * 0.5;
        const signal = 0.3 + depth * 0.52 + travelingSignal * 0.18;
        const alpha = activation * signal;
        const glyphIndex = (particle.glyphOffset + glyphFrame + (index % 3 === 0 ? 1 : 0)) % CORE_GLYPHS.length;
        const glyph = CORE_GLYPHS[glyphIndex];

        context.font = `${particle.weight > 0.86 ? 600 : 500} ${(glyphSize * perspective).toFixed(2)}px "IBM Plex Mono", monospace`;
        context.fillStyle = `rgba(226, 235, 250, ${alpha})`;
        context.fillText(glyph, screenX, screenY);
      }
    };

    const drawStaticFrame = () => drawFrame(performance.now(), true);

    const startAnimation = () => {
      cancelAnimationFrame(animationFrame);
      revealStartedAt = performance.now();
      lastPaintedAt = 0;
      animationFrame = requestAnimationFrame(drawFrame);
    };

    const paint = () => {
      const bounds = frame.getBoundingClientRect();
      cssWidth = Math.max(1, Math.round(bounds.width));
      cssHeight = Math.max(1, Math.round(bounds.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(cssWidth * pixelRatio);
      canvas.height = Math.round(cssHeight * pixelRatio);
      particles = createParticles(cssWidth < 700 ? 760 : 1450);
      paintField();

      if (isVisible && !reduceMotion) startAnimation();
      else drawStaticFrame();
    };

    const schedulePaint = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(paint);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !reduceMotion) startAnimation();
        else {
          cancelAnimationFrame(animationFrame);
          drawStaticFrame();
        }
      },
      { threshold: 0.08 },
    );

    const resizeObserver = new ResizeObserver(schedulePaint);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (reduceMotion) {
        cancelAnimationFrame(animationFrame);
        drawStaticFrame();
      } else if (isVisible) {
        startAnimation();
      }
    };

    visibilityObserver.observe(frame);
    resizeObserver.observe(frame);
    motionQuery.addEventListener("change", handleMotionPreference);
    schedulePaint();

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionPreference);
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(resizeFrame);
    };
  }, []);

  return (
    <div className="continuity-field__visual" ref={frameRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
