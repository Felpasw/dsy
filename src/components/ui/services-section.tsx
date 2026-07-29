import { FadeIn } from "@/components/ui/fade-in";

const EYEBROW = "Escopo";
const TITLE_LINE_1 = "O que a gente";
const TITLE_LINE_2 = "entrega.";
const INTRO =
  "Duas frentes que conversam o tempo todo — o digital sustenta o crescimento, o marketing empurra a marca pra frente.";

const DIGITAL_TITLE = "Soluções digitais";
const DIGITAL_ITEMS = [
  "Desenvolvimento, aplicação e manutenção webdev",
  "Q.A. automatizado B2B e Q.A. manual",
  "Gestão de até 10 projetos em paralelo",
];

const MARKETING_TITLE = "Marketing";
const MARKETING_ITEMS = [
  "Branding empresarial",
  "Gestão e manutenção de e-commerce",
  "Tráfego pago — Meta Ads, Google Ads e Mercado Livre",
  "Merchandising e design de catálogos de produto",
  "Design de conteúdo pra Instagram e YouTube Shorts",
  "Planejamento estratégico de conteúdo baseado em métricas",
  "Logística e produção de material físico com gráficas parceiras",
];

type ServiceCardProps = {
  title: string;
  items: readonly string[];
};

const ServiceCard = ({ title, items }: ServiceCardProps) => (
  <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">{title}</p>
    <ul className="mt-8 flex flex-col gap-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-base leading-relaxed opacity-80 md:text-lg"
        >
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40"
            aria-hidden="true"
          />
          <span>{item}</span>
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

          <p className="max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
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
