import { getFormatter, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { agenda } from "@/lib/data";

export async function AgendaSection() {
  const t = await getTranslations("agenda");
  const format = await getFormatter();

  return (
    <section className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="mx-auto max-w-4xl">
          {agenda.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key}>
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="grid size-12 place-items-center rounded-xl bg-secondary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    {index < agenda.length - 1 ? <div className="h-16 w-px bg-border" /> : null}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm font-bold text-primary">
                      {format.dateTime(new Date(item.date), { dateStyle: "full" })}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{t(`items.${item.key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`items.${item.key}.description`)}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
