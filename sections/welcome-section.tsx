import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";

export async function WelcomeSection() {
  const t = await getTranslations("welcome");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="profil" className="section-pad bg-background">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border bg-muted p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-[#0f4c81] via-[#2d9cdb] to-[#f2c94c] text-white">
              <Image
                src="/images/kepaladinas.png"
                alt={t("headName")}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06182a]/90 via-[#06182a]/58 to-transparent p-6 pt-24">
                <h2 className="mt-3 text-2xl font-black">{t("headName")}</h2>
                <p className="mt-2 text-white/80">{t("position")}</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <Badge>{t("eyebrow")}</Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h2>
          <div className="mt-6 grid gap-5 text-base leading-8 text-muted-foreground sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
