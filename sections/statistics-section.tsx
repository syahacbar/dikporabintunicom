import { getTranslations } from "next-intl/server";
import { AnimatedCounter, Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { educationStats, stats } from "@/lib/data";
import { cn } from "@/lib/utils";

function percent(value: number, max: number) {
  return `${Math.max((value / max) * 100, 5)}%`;
}

function BarRow({
  label,
  value,
  max,
  className,
}: {
  label: string;
  value: number;
  max: number;
  className?: string;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="font-bold text-primary">{value.toLocaleString("id-ID")}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full bg-primary", className)} style={{ width: percent(value, max) }} />
      </div>
    </div>
  );
}

export async function StatisticsSection() {
  const t = await getTranslations("statistics");
  const level = await getTranslations("statistics.levels");
  const status = await getTranslations("statistics.status");
  const employment = await getTranslations("statistics.employment");

  const totalSchools = educationStats.schoolsByStatus.reduce((sum, item) => sum + item.value, 0);
  const maxSchoolLevel = Math.max(...educationStats.schoolsByLevel.map((item) => item.value));
  const maxStudentLevel = Math.max(...educationStats.studentsByLevel.map((item) => item.value));
  const maxTeacherLevel = Math.max(...educationStats.teachersByLevel.map((item) => item.value));
  const maxDistrict = Math.max(...educationStats.schoolsByDistrict.map((item) => item.public + item.private));

  return (
    <section id="statistik" className="section-pad bg-muted">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.slice(0, 3).map((stat) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.key}>
                <Card className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-6" />
                    </div>
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-yellow-700 dark:text-yellow-200">
                      {t("summaryBadge")}
                    </span>
                  </div>
                  <p className="text-4xl font-black text-primary">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">{t(`items.${stat.key}`)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <Card className="h-full p-6">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("schools.kicker")}</p>
                <h3 className="mt-2 text-2xl font-black">{t("schools.title")}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("schools.description")}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {educationStats.schoolsByStatus.map((item) => (
                  <div key={item.key} className="rounded-xl border bg-muted/50 p-4">
                    <p className="text-sm font-semibold text-muted-foreground">{status(item.key)}</p>
                    <p className="mt-2 text-3xl font-black text-primary">
                      <AnimatedCounter value={item.value} />
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: percent(item.value, totalSchools) }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <h4 className="font-bold">{t("schools.byLevel")}</h4>
                {educationStats.schoolsByLevel.map((item) => (
                  <BarRow key={item.key} label={level(item.key)} value={item.value} max={maxSchoolLevel} className="bg-secondary" />
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="h-full p-6">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("schools.districtKicker")}</p>
                <h3 className="mt-2 text-2xl font-black">{t("schools.districtTitle")}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("schools.districtDescription")}</p>
              </div>
              <div className="grid max-h-[560px] gap-4 overflow-y-auto pr-1">
                {educationStats.schoolsByDistrict.map((item) => {
                  const total = item.public + item.private;
                  return (
                    <div key={item.name} className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold">{item.name}</span>
                        <span className="font-bold text-primary">{total}</span>
                      </div>
                      <div className="flex h-3 overflow-hidden rounded-full bg-muted" style={{ width: percent(total, maxDistrict) }}>
                        <div className="bg-primary" style={{ width: `${(item.public / total) * 100}%` }} />
                        <div className="bg-secondary" style={{ width: `${(item.private / total) * 100}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {status("public")}: {item.public} · {status("private")}: {item.private}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <Card className="h-full p-6">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("students.kicker")}</p>
                <h3 className="mt-2 text-2xl font-black">{t("students.title")}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("students.description")}</p>
              </div>
              <div className="grid gap-4">
                {educationStats.studentsByLevel.map((item) => (
                  <BarRow key={item.key} label={level(item.key)} value={item.value} max={maxStudentLevel} className="bg-primary" />
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal>
            <Card className="h-full p-6">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("teachers.kicker")}</p>
                <h3 className="mt-2 text-2xl font-black">{t("teachers.title")}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("teachers.description")}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {educationStats.teachersByEmployment.map((item) => (
                  <div key={item.key} className="rounded-xl border bg-muted/50 p-4">
                    <p className="text-sm font-semibold text-muted-foreground">{employment(item.key)}</p>
                    <p className="mt-2 text-2xl font-black text-primary">
                      <AnimatedCounter value={item.value} />
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-background">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: "100%" }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                <h4 className="font-bold">{t("teachers.byLevel")}</h4>
                {educationStats.teachersByLevel.map((item) => (
                  <BarRow key={item.key} label={level(item.key)} value={item.value} max={maxTeacherLevel} className="bg-secondary" />
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
