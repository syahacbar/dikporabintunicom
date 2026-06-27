import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export async function ContactSection() {
  const t = await getTranslations("contact");

  return (
    <section id="kontak" className="section-pad bg-muted">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid gap-4">
              {[
                [MapPin, t("address")],
                [Phone, t("phone")],
                [Mail, t("email")],
                [Clock, t("hours")],
              ].map(([Icon, value], index) => {
                const TypedIcon = Icon as typeof MapPin;
                return (
                  <div key={index} className="flex gap-4 rounded-xl border bg-background p-5">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                      <TypedIcon className="size-5" />
                    </div>
                    <p className="font-semibold leading-6">{value as string}</p>
                  </div>
                );
              })}
              <div className="grid min-h-72 place-items-center rounded-xl border bg-[linear-gradient(135deg,rgba(15,76,129,0.16),rgba(45,156,219,0.12))] p-6 text-center">
                <div>
                  <MapPin className="mx-auto mb-3 size-10 text-primary" />
                  <p className="font-bold">{t("mapPlaceholder")}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{t("mapDescription")}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <form className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold">
                  {t("form.name")}
                  <input className="focus-ring h-11 rounded-xl border bg-background px-4" placeholder={t("form.namePlaceholder")} />
                </label>
                <label className="grid gap-2 text-sm font-semibold">
                  {t("form.email")}
                  <input className="focus-ring h-11 rounded-xl border bg-background px-4" type="email" placeholder={t("form.emailPlaceholder")} />
                </label>
              </div>
              <label className="mt-4 grid gap-2 text-sm font-semibold">
                {t("form.subject")}
                <input className="focus-ring h-11 rounded-xl border bg-background px-4" placeholder={t("form.subjectPlaceholder")} />
              </label>
              <label className="mt-4 grid gap-2 text-sm font-semibold">
                {t("form.message")}
                <textarea className="focus-ring min-h-36 rounded-xl border bg-background p-4" placeholder={t("form.messagePlaceholder")} />
              </label>
              <Button className="mt-5 w-full sm:w-auto">{t("form.submit")}</Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
