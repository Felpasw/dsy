import { Compass, Rocket, Search, TrendingUp } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { FadeIn } from "@/components/ui/fade-in";

const EYEBROW = "Processo";
const TITLE_LINE_1 = "Como a gente";
const TITLE_LINE_2 = "trabalha.";
const INTRO =
  "Todo projeto começa com uma pergunta e termina com um resultado mensurável. No meio, quatro passos que a gente não pula.";

type StepIcon = ComponentType<SVGProps<SVGSVGElement>>;

type ProcessStep = {
  icon: StepIcon;
  title: string;
  description: string;
};

const STEPS: readonly ProcessStep[] = [
  {
    icon: Search,
    title: "Descoberta",
    description:
      "Mergulho no negócio, público e concorrência. A gente parte do que os dados e as pessoas mostram — não de achismo.",
  },
  {
    icon: Compass,
    title: "Estratégia",
    description:
      "Definição de posicionamento, prioridades e KPIs. Direção clara antes de qualquer entrega ganhar o mundo.",
  },
  {
    icon: Rocket,
    title: "Execução",
    description:
      "Time integrado tocando dev, design, conteúdo e mídia lado a lado — nada terceirizado, tudo alinhado.",
  },
  {
    icon: TrendingUp,
    title: "Evolução",
    description:
      "Medimos, ajustamos e escalamos. O que não performa vira aprendizado; o que performa vira padrão.",
  },
];

type StepBlockProps = {
  step: ProcessStep;
};

const StepBlock = ({ step }: StepBlockProps) => {
  const Icon = step.icon;
  return (
    <div className="animated-border relative flex flex-col gap-5 rounded-2xl border border-white/10 bg-black p-6 md:p-8">
      <Icon
        className="h-6 w-6 opacity-70 md:h-7 md:w-7"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h3 className="text-2xl font-bold uppercase tracking-tighter md:text-3xl">
        {step.title}
      </h3>
      <p className="max-w-md text-sm leading-relaxed opacity-70 md:text-base">
        {step.description}
      </p>
    </div>
  );
};

export function ProcessSection() {
  return (
    <section className="w-full px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-20 md:gap-24">
        <FadeIn className="flex max-w-3xl flex-col gap-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
            {EYEBROW}
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter md:text-6xl">
            <span className="block">{TITLE_LINE_1}</span>
            <span className="block">{TITLE_LINE_2}</span>
          </h2>

          <p className="max-w-lg font-mono text-[11px] uppercase leading-relaxed tracking-[0.15em] opacity-50">
            {INTRO}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-20 md:gap-y-24">
          {STEPS.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.1}>
              <StepBlock step={step} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
