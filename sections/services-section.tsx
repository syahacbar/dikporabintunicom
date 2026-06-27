import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { serviceGroups } from "@/lib/data";

export async function ServicesSection() {
  const t = await getTranslations("services");

  return (
    <section id="layanan" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div className="sticky top-28 overflow-hidden rounded-2xl bg-[#071d33] p-7 text-white shadow-2xl shadow-blue-950/20">
              <div className="absolute -right-12 -top-12 size-48 rounded-full bg-secondary/25 blur-2xl" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{t("popular")}</p>
                <h3 className="mt-4 text-3xl font-black">{t("panelTitle")}</h3>
                <p className="mt-4 text-sm leading-7 text-white/72">{t("panelDescription")}</p>
                <div className="mt-8 grid gap-3">
                  {serviceGroups.map((group) => {
                    const Icon = group.icon;
                    const isDisabled = group.href === "#";
                    return (
                      <a
                        key={group.key}
                        href={group.href}
                        className={`flex items-center gap-3 rounded-xl bg-white/10 p-4 transition ${
                          isDisabled ? "pointer-events-none cursor-not-allowed opacity-55" : "hover:bg-white/16"
                        }`}
                        aria-disabled={isDisabled}
                        tabIndex={isDisabled ? -1 : undefined}
                        target={group.href.startsWith("http") ? "_blank" : undefined}
                        rel={group.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        <Icon className="size-5 text-accent" />
                        <span className="font-semibold">{t(`groups.${group.key}.title`)}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {serviceGroups.map((group) => {
              const Icon = group.icon;
              const isDisabled = group.href === "#";
              return (
                <Reveal key={group.key}>
                  <Card className="group h-full overflow-hidden p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-200">
                        {t(`groups.${group.key}.badge`)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{t(`groups.${group.key}.title`)}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{t(`groups.${group.key}.description`)}</p>
                    <a
                      href={group.href}
                      className={`mt-5 inline-flex rounded-xl border px-4 py-2 text-sm font-bold transition ${
                        isDisabled
                          ? "pointer-events-none cursor-not-allowed text-muted-foreground opacity-55"
                          : "text-primary hover:border-secondary hover:bg-secondary/10"
                      }`}
                      aria-disabled={isDisabled}
                      tabIndex={isDisabled ? -1 : undefined}
                      target={group.href.startsWith("http") ? "_blank" : undefined}
                      rel={group.href.startsWith("http") ? "noreferrer" : undefined}
                    >
                      {t("openService")}
                    </a>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
