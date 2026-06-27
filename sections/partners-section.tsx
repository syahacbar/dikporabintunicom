import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { partners } from "@/lib/data";

export async function PartnersSection() {
  const t = await getTranslations("partners");

  return (
    <section id="kebudayaan" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {partners.map((partner) => {
              const Icon = partner.icon;
              return (
                <div key={partner.key} className="grid min-h-36 place-items-center rounded-xl border bg-muted/40 p-5 text-center">
                  <Icon className="mb-3 size-8 text-primary" />
                  <p className="text-sm font-bold">{t(`items.${partner.key}`)}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
