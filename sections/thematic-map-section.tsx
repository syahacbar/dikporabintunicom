import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { ThematicMapClient } from "@/components/thematic-map-client";

export async function ThematicMapSection() {
  const t = await getTranslations("thematicMap");

  return (
    <section id="peta-tematik" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <Reveal>
          <ThematicMapClient />
        </Reveal>
      </div>
    </section>
  );
}
