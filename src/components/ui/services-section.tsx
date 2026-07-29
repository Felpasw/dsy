import { FadeIn } from "@/components/ui/fade-in";

const EYEBROW = "Escopo";
const TITLE_LINE_1 = "O que";
const TITLE_LINE_2 = "entregamos.";
const INTRO =
  "Dois pilares complementares — tecnologia sustenta o crescimento, marketing constrói a presença.";

type ServiceItem = {
  title: string;
  description: string;
};

const DIGITAL_TITLE = "Soluções digitais e tecnologia";
const DIGITAL_ITEMS: readonly ServiceItem[] = [
  {
    title: "Web Development",
    description:
      "Desenvolvimento, aplicação e manutenção contínua de projetos web.",
  },
  {
    title: "Quality Assurance (QA)",
    description:
      "Controle de qualidade de software com testes manuais e automatizados focados no mercado B2B.",
  },
  {
    title: "Gestão de projetos",
    description:
      "Capacidade de gerenciamento e execução de até 10 projetos simultâneos.",
  },
];

const MARKETING_TITLE = "Marketing e presença digital";
const MARKETING_ITEMS: readonly ServiceItem[] = [
  {
    title: "Estratégia e Branding",
    description:
      "Construção e fortalecimento de marca corporativa, alinhado a um planejamento estratégico de conteúdo para Instagram guiado por métricas e análise de dados.",
  },
  {
    title: "Performance (Tráfego Pago)",
    description:
      "Gestão otimizada de anúncios no Meta Ads, Google Ads e Mercado Livre.",
  },
  {
    title: "E-commerce",
    description:
      "Gestão integral e manutenção operacional de lojas virtuais.",
  },
  {
    title: "Design Criativo",
    description:
      "Criação de catálogos de produtos e desenvolvimento de conteúdo visual e em vídeo para Instagram e YouTube Shorts.",
  },
];

type ServiceCardProps = {
  title: string;
  items: readonly ServiceItem[];
};

const ServiceCard = ({ title, items }: ServiceCardProps) => (
  <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
      {title}
    </p>
    <ul className="mt-8 flex flex-col gap-6">
      {items.map((item) => (
        <li key={item.title} className="flex items-start gap-3">
          <span
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-white/90">
              {item.title}
            </p>
            <p className="text-sm leading-relaxed opacity-70 md:text-base">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export function ServicesSection() {
  return (
    <section className="w-full px-6 py-24 text-white md:px-12 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 md:gap-20">
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

        <FadeIn
          delay={0.15}
          className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-8"
        >
          <ServiceCard title={DIGITAL_TITLE} items={DIGITAL_ITEMS} />
          <ServiceCard title={MARKETING_TITLE} items={MARKETING_ITEMS} />
        </FadeIn>
      </div>
    </section>
  );
}
