import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { programGroups } from "@/lib/data";

export async function ProgramsSection() {
  const t = await getTranslations("programs");

  return (
    <section id="pendidikan" className="section-pad bg-muted">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {programGroups.map((group) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.key}>
                <Card className="h-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
                  <div className="p-6">
                    <Icon className="mb-5 size-9 text-primary" />
                    <h3 className="text-xl font-bold">{t(`groups.${group.key}.title`)}</h3>
                    <div className="mt-5 grid gap-3">
                      {group.items.map((item) => (
                        <div key={item} className="rounded-xl bg-muted p-4">
                          <p className="font-semibold">{t(`groups.${group.key}.items.${item}.title`)}</p>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {t(`groups.${group.key}.items.${item}.description`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
