import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-[#071320] text-white">
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        &copy; 2026 {t("copyright")}
      </div>
    </footer>
  );
}
