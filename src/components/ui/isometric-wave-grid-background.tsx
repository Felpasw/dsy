"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";

type IsoLevelWarpProps = HTMLAttributes<HTMLDivElement> & {
  color?: string;
  speed?: number;
  density?: number;
};

const IsoLevelWarp = ({
  className,
  color = "255, 255, 255",
  speed = 1,
  density = 40,
  ...props
}: IsoLevelWarpProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let animationFrameId: number;

    const gridGap = density;
    let time = 0;

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      const rows = Math.ceil(height / gridGap) + 5;
      const cols = Math.ceil(width / gridGap) + 5;

      ctx.clearRect(0, 0, width, height);

      time += 0.01 * speed;

      ctx.beginPath();

      for (let y = 0; y <= rows; y++) {
        let isFirst = true;

        for (let x = 0; x <= cols; x++) {
          const baseX = x * gridGap - gridGap * 2;
          const baseY = y * gridGap - gridGap * 2;

          const wave =
            Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 15;

          const finalX = baseX;
          const finalY = baseY + wave;

          if (isFirst) {
            ctx.moveTo(finalX, finalY);
            isFirst = false;
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }
      }

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `rgba(${color}, 0)`);
      gradient.addColorStop(0.5, `rgba(${color}, 0.4)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, speed, density]);

  const containerClass = [
    "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClass} {...props}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
    </div>
  );
};

export default IsoLevelWarp;
