"use client";

import { RulerCarousel, type CarouselItem } from "@/components/ui/ruler-carousel";

const ADJECTIVES: CarouselItem[] = [
  { id: 1, title: "GOSTOSA" },
  { id: 2, title: "LINDA" },
  { id: 3, title: "MAJESTOSA" },
  { id: 4, title: "SABOROSA" },
];

export function Demo() {
  return <RulerCarousel originalItems={ADJECTIVES} />;
}
