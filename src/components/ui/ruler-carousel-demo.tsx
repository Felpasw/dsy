"use client";

import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

const ADJECTIVES: CarouselItem[] = [
  { id: 1, title: "CRIATIVA" },
  { id: 2, title: "ESTRATÉGICA" },
  { id: 3, title: "OUSADA" },
  { id: 4, title: "AUTÊNTICA" },
];

export function Demo() {
  return <RulerCarousel originalItems={ADJECTIVES} />;
}
