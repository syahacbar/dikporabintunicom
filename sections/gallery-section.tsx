import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { gallery } from "@/lib/data";
import { cn } from "@/lib/utils";

export async function GallerySection() {
  const t = await getTranslations("gallery");

  return (
    <section id="galeri" className="section-pad bg-muted">
      <div className="container-page">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((item) => (
            <Reveal key={item.key} className="mb-5 break-inside-avoid">
              <figure className={cn("overflow-hidden rounded-xl bg-gradient-to-br p-5 text-white shadow-lg", item.color, item.height)}>
                <div className="flex h-full flex-col justify-end rounded-xl bg-black/10 p-5">
                  <figcaption className="text-xl font-black">{t(`items.${item.key}.title`)}</figcaption>
                  <p className="mt-2 text-sm leading-6 text-white/80">{t(`items.${item.key}.description`)}</p>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
