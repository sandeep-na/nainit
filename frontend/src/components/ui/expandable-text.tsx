"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Truncated text with "Read more / Show less" toggle.
 * No fixed height — collapsed state clamps, expanded shows full text,
 * and the full detail always lives on the card's detail page/link.
 */
export function ExpandableText({
  text,
  lines = 3,
  className,
  buttonClassName,
  moreLabel = "Read more",
  lessLabel = "Show less",
}: {
  text: string;
  lines?: 1 | 2 | 3 | 4;
  className?: string;
  buttonClassName?: string;
  moreLabel?: string;
  lessLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const clamp =
    lines === 1 ? "line-clamp-1" : lines === 2 ? "line-clamp-2" : lines === 4 ? "line-clamp-4" : "line-clamp-3";

  return (
    <div className={className}>
      <p className={cn("text-sm text-slate-600 dark:text-slate-400", !open && clamp)}>{text}</p>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        className={cn(
          "mt-1.5 text-xs font-semibold text-sky-500 transition-colors hover:text-sky-600 hover:underline",
          buttonClassName
        )}
      >
        {open ? lessLabel : moreLabel}
      </button>
    </div>
  );
}
