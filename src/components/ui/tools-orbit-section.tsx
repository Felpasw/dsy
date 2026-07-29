import { FadeIn } from "@/components/ui/fade-in";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";

const EYEBROW = "Stack";
const TITLE_LINE_1 = "As ferramentas";
const TITLE_LINE_2 = "que orbitam a gente.";
const SUBTITLE =
  "Da prancheta ao ar. Um recorte do que a gente usa pra tocar dev, design, mídia paga e conteúdo — sem casar com stack, mas fluente nas que importam.";
const COPYRIGHT = "© 2026 DSY Studio";
const TAGLINE = "Feito à mão, com cabeça e alma.";
const FOUNDER_NAME = "Deisy";
const FOUNDER_LABEL = "Founder & Creative Director";

export function ToolsOrbitSection() {
  return (
    <footer className="w-full px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <FadeIn className="flex max-w-3xl flex-col gap-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
            {EYEBROW}
          </p>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
            <span className="block">{TITLE_LINE_1}</span>
            <span className="block">{TITLE_LINE_2}</span>
          </h2>
          <p className="max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] opacity-50">
            {SUBTITLE}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <OrbitingCirclesGlobe />
        </FadeIn>

        <FadeIn
          delay={0.25}
          className="grid grid-cols-1 items-center gap-6 border-t border-white/10 pt-8 text-center md:grid-cols-3 md:gap-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
            {COPYRIGHT}
          </p>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-80">
              {FOUNDER_NAME}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
              {FOUNDER_LABEL}
            </p>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
            {TAGLINE}
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
