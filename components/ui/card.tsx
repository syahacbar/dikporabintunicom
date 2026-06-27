import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-xl border bg-background shadow-sm shadow-blue-950/5 transition-colors", className)}
      {...props}
    />
  );
}
