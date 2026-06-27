"use client";

import dynamic from "next/dynamic";

const ThematicEducationMap = dynamic(
  () => import("@/components/thematic-education-map").then((mod) => mod.ThematicEducationMap),
  {
    ssr: false,
    loading: () => <div className="h-[560px] rounded-2xl border bg-muted" />,
  },
);

export function ThematicMapClient() {
  return <ThematicEducationMap />;
}
