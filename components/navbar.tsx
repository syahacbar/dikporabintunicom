"use client";

import { Mail, MapPin, Menu, Phone, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/data";
import { Link } from "@/i18n/routing";

export function Navbar() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] border-b bg-background/86 shadow-sm shadow-blue-950/5 backdrop-blur-2xl">
      <div className="border-b bg-[#071d33] text-white">
        <div className="container-page flex min-h-12 flex-col gap-2 py-2 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex items-center gap-3 focus-ring rounded-xl">
            <div className="grid size-11 place-items-center rounded-xl bg-white p-1.5 shadow-lg">
              <Image
                src="/images/logo_telbin_new.png"
                alt={common("regency")}
                width={36}
                height={36}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{common("agencyShort")}</p>
              <p className="flex items-center gap-1 text-xs text-white/70">
                <ShieldCheck className="size-3.5 text-accent" /> {common("regency")}
              </p>
            </div>
          </Link>
          <div className="hidden gap-5 text-xs text-white/78 md:flex md:flex-wrap lg:justify-end">
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> {common("addressShort")}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4" /> {common("email")}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4" /> {common("phone")}
            </span>
          </div>
        </div>
      </div>
      <nav className="container-page flex h-[72px] items-center justify-between">
        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="focus-ring group flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {t(item.label)}
            </a>
          ))}
        </div>
        <a href="#home" className="font-bold text-primary xl:hidden">
          {common("portal")}
        </a>
        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button size="sm">{t("login")}</Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="xl:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>
      {open ? (
        <div className="border-t bg-background xl:hidden">
          <div className="container-page grid gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted"
              >
                {t(item.label)}
              </a>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button size="sm">{t("login")}</Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
