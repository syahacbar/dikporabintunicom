"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { MotionDiv } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/lib/data";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const id = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-[#06182a] text-white">
      <div className={cn("absolute inset-0 bg-gradient-to-br transition-colors duration-700", slide.color)} />
      <MotionDiv
        key={slide.image}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={slide.image}
          alt={t(`slides.${slide.key}.title`)}
          fill
          priority={active === 0}
          sizes="100vw"
          className="object-cover"
        />
      </MotionDiv>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,24,42,0.06)_0%,rgba(6,24,42,0.08)_58%,rgba(6,24,42,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[#06182a]/8" />
      <div className="absolute inset-0 premium-grid opacity-[0.035]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06182a]/58 to-transparent" />
      <div className="container-page relative flex min-h-[760px] items-end justify-center pb-16 pt-16">
        <MotionDiv
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex justify-center">
            <Button
              asChild
              variant="gold"
              className="h-14 rounded-2xl px-8 text-base font-black shadow-2xl shadow-yellow-500/35 ring-2 ring-white/35 hover:scale-[1.03]"
            >
              <a href="#layanan">
                {t("primaryCta")} <ChevronRight className="size-5" />
              </a>
            </Button>
          </div>
          <div className="mt-6 grid w-56 grid-cols-4 gap-2">
            {heroSlides.map((item, index) => (
              <button
                key={item.key}
                type="button"
                aria-label={t(`slides.${item.key}.label`)}
                onClick={() => setActive(index)}
                className={cn(
                  "h-2 rounded-full bg-primary/20 transition",
                  active === index ? "bg-primary" : "hover:bg-primary/40",
                )}
              />
            ))}
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
