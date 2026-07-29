import Image from "next/image";

const EYEBROW = "Manifesto";
const TITLE_LINE_1 = "Marcas que";
const TITLE_LINE_2 = "movem marcas.";
const PARAGRAPH_1 =
  "A DSY nasceu pra tirar marcas do lugar-comum. Fundada por Deysi, transformamos identidade, estratégia e conteúdo em presença — daquele tipo que a audiência lembra, comenta e volta a procurar.";
const PARAGRAPH_2 =
  "Trabalhamos lado a lado com fundadores e times pra construir marcas com voz própria, direção clara e execução afiada. Sem fórmula pronta, sem barulho — só o que faz diferença.";
const FOUNDER_LABEL = "Founder & Creative Director";
const FOUNDER_NAME = "Deysi";
const LOGO_ALT = "DSY";

export function AboutSection() {
  return (
    <section className="w-full bg-black px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-24">
        <div className="flex justify-center md:justify-start">
          <Image
            src="/dsy.png"
            alt={LOGO_ALT}
            width={500}
            height={500}
            className="h-auto w-full max-w-xs invert md:max-w-sm"
          />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.35em] opacity-60">
            {EYEBROW}
          </p>

          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            <span className="block">{TITLE_LINE_1}</span>
            <span className="block">{TITLE_LINE_2}</span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
            {PARAGRAPH_1}
          </p>
          <p className="max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
            {PARAGRAPH_2}
          </p>

          <div className="mt-4 border-t border-white/10 pt-6">
            <p className="text-sm uppercase tracking-[0.25em] opacity-80">
              {FOUNDER_NAME}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] opacity-50">
              {FOUNDER_LABEL}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
