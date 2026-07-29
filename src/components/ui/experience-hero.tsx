"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type * as THREE from "three";

const BRAND_ID = "DSY.STUDIO";
const HEADING_LINE_1 = "AGÊNCIA";
const HEADING_LINE_2 = "CRIATIVA";
const HERO_SUBTITLE =
  "Construímos marcas, produtos e experiências digitais que mudam o jogo — do código à campanha.";
const CTA_LABEL = "Começar um projeto";
const LOGO_ALT = "DSY";

const Monolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    meshRef.current.position.x = state.viewport.width * 0.28;
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[10, 1]} />
        <MeshDistortMaterial
          color="#ffffff"
          speed={3}
          distort={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
};

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 2.2,
          ease: "expo.out",
        },
      );

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2),
        );
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
          return;
        }
        gsap.to(ctaRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden selection:bg-white selection:text-black"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/dsy.png"
          alt={LOGO_ALT}
          width={500}
          height={500}
          priority
          className="absolute left-[78%] top-1/2 h-auto w-48 -translate-x-1/2 -translate-y-1/2 opacity-40 invert md:w-80"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <spotLight position={[50, 50, 50]} intensity={3} />
          <Monolith />
        </Canvas>
      </div>

      <div
        ref={revealRef}
        className="relative z-20 flex min-h-screen w-full flex-col justify-between gap-10 p-8 md:p-14 lg:p-20"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-2.5 w-2.5 rounded-full bg-white">
            <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-30" />
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            {BRAND_ID}
          </span>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] font-black uppercase leading-[0.87] tracking-tighter text-white">
            {HEADING_LINE_1}
            <br />
            <span className="text-outline">{HEADING_LINE_2}</span>
          </h1>
          <p className="mt-8 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.35em] text-white/40">
            {HERO_SUBTITLE}
          </p>
        </div>

        <button
          type="button"
          ref={ctaRef}
          className="group flex w-fit items-center gap-6"
        >
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-all duration-500 group-hover:bg-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-white transition-colors duration-500 group-hover:stroke-black"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H8M17 7V16"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            {CTA_LABEL}
          </span>
        </button>
      </div>
    </section>
  );
};
