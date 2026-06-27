"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex rounded-xl border p-1">
      {(["id", "en"] as const).map((item) => (
        <Button
          key={item}
          type="button"
          size="sm"
          variant={locale === item ? "default" : "ghost"}
          className="h-8 px-3 text-xs uppercase"
          onClick={() => router.replace(pathname, { locale: item })}
          aria-pressed={locale === item}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
