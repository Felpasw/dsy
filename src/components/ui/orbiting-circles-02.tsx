"use client";

import Image from "next/image";
import type React from "react";

type OrbitIcon = {
  src: string;
  alt: string;
  angle: number;
};

type Orbit = {
  size: string;
  duration: number;
  direction: "cw" | "ccw";
  icons: OrbitIcon[];
};

const CENTER_LOGO_SRC = "/dsy.png";
const CENTER_LOGO_ALT = "DSY";

const orbits: Orbit[] = [
  {
    size: "w-52 h-52 md:w-180 md:h-180",
    duration: 18,
    direction: "cw",
    icons: [
      {
        src: "https://cdn.simpleicons.org/figma/ffffff",
        alt: "Figma",
        angle: -60,
      },
      {
        src: "https://cdn.simpleicons.org/react/ffffff",
        alt: "React",
        angle: 0,
      },
      {
        src: "https://cdn.simpleicons.org/typescript/ffffff",
        alt: "TypeScript",
        angle: 60,
      },
    ],
  },
  {
    size: "w-72 h-72 md:w-220 md:h-220",
    duration: 24,
    direction: "ccw",
    icons: [
      {
        src: "https://cdn.simpleicons.org/instagram/ffffff",
        alt: "Instagram",
        angle: 0,
      },
      {
        src: "https://cdn.simpleicons.org/youtube/ffffff",
        alt: "YouTube",
        angle: -90,
      },
    ],
  },
  {
    size: "w-88 h-88 md:w-265 md:h-265",
    duration: 30,
    direction: "cw",
    icons: [
      {
        src: "https://cdn.simpleicons.org/meta/ffffff",
        alt: "Meta",
        angle: -45,
      },
      {
        src: "https://cdn.simpleicons.org/google/ffffff",
        alt: "Google",
        angle: 45,
      },
    ],
  },
];

export default function OrbitingCirclesGlobe() {
  return (
    <div className="relative flex h-72 w-full justify-center overflow-hidden md:h-160">
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(var(--start-angle)) }
          to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
        }
        @keyframes counter-cw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
        }
        @keyframes counter-ccw {
          from { transform: rotate(var(--counter-offset, 0deg)) }
          to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
        }
      `}</style>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 aspect-square w-20 -translate-x-1/2 md:bottom-6 md:w-44">
        <Image
          src={CENTER_LOGO_SRC}
          alt={CENTER_LOGO_ALT}
          width={500}
          height={500}
          className="h-auto w-full invert"
        />
      </div>

      {orbits.map((orbit) => {
        const orbitAnim = orbit.direction === "cw" ? "orbit-cw" : "orbit-ccw";
        const counterAnim =
          orbit.direction === "cw" ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
          })),
        ];

        return (
          <div
            key={orbit.size}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/15 ${orbit.size}`}
          >
            {allIcons.map((iconData) => (
              <div
                key={`${iconData.alt}-${iconData.angle}`}
                className="absolute left-1/2 top-0 -ml-6 flex h-1/2 origin-bottom flex-col items-center justify-start md:-ml-8"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="relative z-10 -mt-6 rounded-full border border-white/15 bg-black p-3 md:-mt-8 md:p-4"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={iconData.src}
                    alt={iconData.alt}
                    width={32}
                    height={32}
                    className="h-6 w-6 md:h-8 md:w-8"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
