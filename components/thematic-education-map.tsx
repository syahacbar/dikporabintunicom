"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { educationStats, thematicDistricts } from "@/lib/data";
import { cn } from "@/lib/utils";

type ThemeKey = "schools" | "students" | "teachers";
type BreakdownItem = { key: string; value: number; color?: string };

const themeKeys: ThemeKey[] = ["schools", "students", "teachers"];

function valueForTheme(district: (typeof thematicDistricts)[number], theme: ThemeKey) {
  if (theme === "schools") return district.public + district.private;
  return 0;
}

function markerColor() {
  return "#0F4C81";
}

function allocateBreakdown<T extends { key: string; value: number; color?: string }>(items: readonly T[], total: number): BreakdownItem[] {
  const sourceTotal = items.reduce((sum, item) => sum + item.value, 0);
  const raw = items.map((item) => ({
    ...item,
    value: Math.floor((item.value / sourceTotal) * total),
    remainder: ((item.value / sourceTotal) * total) % 1,
  }));
  let diff = total - raw.reduce((sum, item) => sum + item.value, 0);

  return raw
    .sort((a, b) => b.remainder - a.remainder)
    .map((item) => {
      const add = diff > 0 ? 1 : 0;
      diff -= add;
      return { key: item.key, value: item.value + add, color: item.color };
    })
    .sort((a, b) => items.findIndex((item) => item.key === a.key) - items.findIndex((item) => item.key === b.key));
}

function MiniBarList({
  items,
  labelFor,
}: {
  items: readonly BreakdownItem[];
  labelFor: (key: string) => string;
}) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item.key} className="grid gap-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold">{labelFor(item.key)}</span>
            <span className="font-black text-primary">{item.value.toLocaleString("id-ID")}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted">
            <div
              className={cn("h-full rounded-full bg-primary", item.color)}
              style={{ width: `${Math.max((item.value / max) * 100, 5)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThematicEducationMap() {
  const t = useTranslations("thematicMap");
  const level = useTranslations("statistics.levels");
  const status = useTranslations("statistics.status");
  const employment = useTranslations("statistics.employment");
  const [theme, setTheme] = useState<ThemeKey>("schools");
  const [selected, setSelected] = useState<(typeof thematicDistricts)[number]>(thematicDistricts[0]);
  const max = Math.max(...thematicDistricts.map((district) => valueForTheme(district, "schools")));
  const color = markerColor();

  const totalSchools = useMemo(() => educationStats.schoolsByStatus.reduce((sum, item) => sum + item.value, 0), []);
  const totalStudents = useMemo(() => educationStats.studentsByLevel.reduce((sum, item) => sum + item.value, 0), []);
  const totalTeachers = useMemo(() => educationStats.teachersByEmployment.reduce((sum, item) => sum + item.value, 0), []);
  const total = theme === "schools" ? totalSchools : theme === "students" ? totalStudents : totalTeachers;

  const selectedSchools = selected.public + selected.private;
  const schoolLevelBreakdown = allocateBreakdown(educationStats.schoolsByLevel, selectedSchools);
  const detailTitle = theme === "schools" ? t("districtTitle", { district: selected.name }) : t("regencyTitle");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(420px,0.85fr)]">
      <div className="flex h-[560px] flex-col overflow-hidden rounded-2xl border bg-background shadow-xl shadow-blue-950/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">{t("mapLabel")}</p>
            <p className="text-sm text-muted-foreground">{t(`mapDescriptions.${theme}`)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {themeKeys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTheme(key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-bold transition",
                  theme === key ? "border-primary bg-primary text-primary-foreground" : "bg-background hover:bg-muted",
                )}
              >
                {t(`themes.${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          <MapContainer
            center={[-2.12, 133.54]}
            zoom={8}
            minZoom={7}
            scrollWheelZoom={false}
            className="h-full w-full"
            zoomControl
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {theme === "schools" ? thematicDistricts.map((district) => {
              const value = valueForTheme(district, "schools");
              const radius = 9 + (value / max) * 22;
              return (
                <CircleMarker
                  key={district.name}
                  center={[district.lat, district.lng]}
                  radius={radius}
                  pathOptions={{
                    color,
                    fillColor: color,
                    fillOpacity: selected.name === district.name ? 0.78 : 0.46,
                    weight: selected.name === district.name ? 3 : 1,
                  }}
                  eventHandlers={{
                    click: () => setSelected(district),
                    mouseover: () => setSelected(district),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                    <strong>{district.name}</strong>: {value.toLocaleString("id-ID")} {t("themes.schools")}
                  </Tooltip>
                  <Popup>
                    <div className="min-w-44">
                      <strong>{district.name}</strong>
                      <p>{t("themes.schools")}: {value.toLocaleString("id-ID")}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            }) : null}
          </MapContainer>
          {theme !== "schools" ? (
            <div className="pointer-events-none absolute inset-x-6 bottom-6 z-[450] rounded-2xl bg-background/92 p-4 text-sm font-semibold text-foreground shadow-xl backdrop-blur">
              {t(`emptyMapMessages.${theme}`)}
            </div>
          ) : null}
        </div>
      </div>

      <aside className="flex h-[560px] flex-col rounded-2xl border bg-background shadow-xl shadow-blue-950/10">
        <div className="border-b p-5">
          <h3 className="text-2xl font-black leading-tight">{detailTitle}</h3>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="rounded-xl bg-[#071d33] p-5 text-white">
            <p className="text-sm font-bold text-accent">{t("activeTheme")}</p>
            <p className="mt-2 text-2xl font-black">{t(`themes.${theme}`)}</p>
            <p className="mt-2 text-sm text-white/70">
              {t("total")}: {total.toLocaleString("id-ID")}
            </p>
          </div>

          {theme === "schools" ? (
            <div className="mt-6 grid gap-6">
            <section>
              <h4 className="font-bold">{t("sections.byStatus")}</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {[
                  { key: "public", value: selected.public, color: "bg-primary" },
                  { key: "private", value: selected.private, color: "bg-secondary" },
                ].map((item) => (
                  <div key={item.key} className="rounded-xl bg-muted p-4">
                    <p className="text-sm font-semibold text-muted-foreground">{status(item.key)}</p>
                    <p className="mt-2 text-2xl font-black text-primary">{item.value.toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 font-bold">{t("sections.byLevel")}</h4>
              <MiniBarList items={schoolLevelBreakdown} labelFor={(key) => level(key)} />
            </section>
            </div>
          ) : null}

          {theme === "students" ? (
            <div className="mt-6 grid gap-6">
            <section>
              <h4 className="mb-3 font-bold">{t("sections.byLevel")}</h4>
              <MiniBarList items={educationStats.studentsByLevel} labelFor={(key) => level(key)} />
            </section>
            </div>
          ) : null}

          {theme === "teachers" ? (
            <div className="mt-6 grid gap-6">
            <section>
              <h4 className="font-bold">{t("sections.byEmployment")}</h4>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {educationStats.teachersByEmployment.map((item) => (
                  <div key={item.key} className="rounded-xl border bg-muted/50 p-3 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{employment(item.key)}</p>
                    <p className="mt-2 text-xl font-black text-primary">{item.value.toLocaleString("id-ID")}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h4 className="mb-3 font-bold">{t("sections.byLevel")}</h4>
              <MiniBarList items={educationStats.teachersByLevel} labelFor={(key) => level(key)} />
            </section>
            </div>
          ) : null}

          <p className="mt-6 text-xs leading-5 text-muted-foreground">{t("note")}</p>
        </div>
      </aside>
    </div>
  );
}
