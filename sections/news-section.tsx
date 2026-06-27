import { CalendarDays } from "lucide-react";
import { getFormatter, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { news } from "@/lib/data";
import { cn } from "@/lib/utils";

export async function NewsSection() {
  const t = await getTranslations("news");
  const format = await getFormatter();

  return (
    <section id="berita" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {news.slice(0, 1).map((item) => (
            <Reveal key={item.key}>
              <Card className="group h-full overflow-hidden shadow-xl shadow-blue-950/10">
                <div className={cn("min-h-[420px] bg-gradient-to-br", item.image)}>
                  <div className="flex h-full min-h-[420px] flex-col justify-between bg-gradient-to-t from-black/55 to-transparent p-7 text-white">
                    <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs font-black uppercase text-slate-950">
                      {t("featured")}
                    </span>
                    <div>
                    <Badge className="bg-white/90 text-primary">{t(`categories.${item.category}`)}</Badge>
                      <h3 className="mt-4 max-w-xl text-3xl font-black leading-tight">{t(`items.${item.key}.title`)}</h3>
                      <p className="mt-3 max-w-lg text-sm leading-6 text-white/82">{t(`items.${item.key}.summary`)}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
          <div className="grid gap-4">
            {news.slice(1).map((item) => (
              <Reveal key={item.key}>
                <Card className="group grid overflow-hidden sm:grid-cols-[180px_1fr] hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
                  <div className={cn("min-h-44 bg-gradient-to-br", item.image)} />
                  <div className="p-5">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    {format.dateTime(new Date(item.date), { dateStyle: "long" })}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug group-hover:text-primary">{t(`items.${item.key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(`items.${item.key}.summary`)}</p>
                </div>
              </Card>
            </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
