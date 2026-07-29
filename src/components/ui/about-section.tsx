import Image from "next/image";

import { FadeIn } from "@/components/ui/fade-in";

const EYEBROW = "Manifesto";
const TITLE_LINE_1 = "Marcas que";
const TITLE_LINE_2 = "movem marcas.";
const INTRO_PARAGRAPH =
  "A DSY é uma agência híbrida: soluções digitais e marketing estratégico sob o mesmo teto. Do código à campanha, entregamos tudo que uma marca precisa pra crescer com consistência.";
const SECONDARY_PARAGRAPH =
  "Fundada por Deisy, trabalhamos lado a lado com times e founders pra transformar ideia em produto, produto em presença e presença em resultado — sem terceirizar o que importa.";

const LOGO_ALT = "DSY";

export function AboutSection() {
  return (
    <section className="w-full px-6 py-24 text-white md:px-12 md:py-32">
      <FadeIn className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-24">
        <div className="hidden md:flex md:justify-start">
          <Image
            src="/dsy.png"
            alt={LOGO_ALT}
            width={500}
            height={500}
            className="h-auto w-full max-w-xs invert md:max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
            {EYEBROW}
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
            <span className="block">{TITLE_LINE_1}</span>
            <span className="block">{TITLE_LINE_2}</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
            {INTRO_PARAGRAPH}
          </p>
          <p className="max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
            {SECONDARY_PARAGRAPH}
          </p>
        </div>
      </FadeIn>
    </section>
  );
}
