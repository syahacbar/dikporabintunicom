import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { announcements } from "@/lib/data";

export async function AnnouncementsSection() {
  const t = await getTranslations("announcements");

  return (
    <section id="pengumuman" className="section-pad bg-muted">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="rounded-2xl border bg-background p-7 shadow-xl shadow-blue-950/8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{t("eyebrow")}</p>
              <h3 className="mt-4 text-3xl font-black">{t("boardTitle")}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("boardDescription")}</p>
              <div className="mt-8 rounded-xl bg-accent/20 p-4 text-sm font-semibold text-yellow-800 dark:text-yellow-100">
                {t("priority.high")} · {t(`items.${announcements[0].key}.title`)}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4">
            {announcements.map((item) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.key}>
                <article className="flex gap-4 rounded-xl border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold uppercase text-yellow-700 dark:text-yellow-200">
                      {t(`priority.${item.priority}`)}
                    </span>
                    <h3 className="mt-3 text-lg font-bold">{t(`items.${item.key}.title`)}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`items.${item.key}.description`)}</p>
                  </div>
                </article>
              </Reveal>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
