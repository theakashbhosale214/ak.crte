"use client";

import { Fragment, useState, type CSSProperties, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export type ExplorerItem = {
  id: string;
  /** Server-rendered trigger content. Styled via the button's data-state. */
  header: ReactNode;
  /** Server-rendered illustration — mounted only while its panel is open. */
  diagram: ReactNode;
  /** Server-rendered panel content (always in the HTML for search engines). */
  panel: ReactNode;
};

/**
 * One DOM structure, two layouts:
 * - mobile: an accordion — each panel opens beneath its trigger;
 * - desktop: master/detail — triggers in the left column, the open panel
 *   in a sticky right column (all panels share that grid area).
 * Semantics are the disclosure pattern (button + aria-expanded/controls), which
 * stays valid in both layouts. Closed panels use `hidden`; their text stays in
 * the HTML, while their decorative diagrams are only mounted when opened.
 */
export function ServicesExplorer({ items }: { items: ExplorerItem[] }) {
  const [active, setActive] = useState<number | null>(0);
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  // Desktop always shows a panel; mobile can collapse everything.
  const shown = isDesktop ? (active ?? 0) : active;

  const select = (index: number) => {
    setActive(isDesktop ? index : shown === index ? null : index);
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[repeat(6,auto)_1fr] lg:gap-x-12 xl:gap-x-16">
      {items.map((item, index) => {
        const open = shown === index;
        const triggerId = `service-trigger-${item.id}`;
        const panelId = `service-panel-${item.id}`;
        return (
          <Fragment key={item.id}>
            <h3
              style={{ "--row": index + 1 } as CSSProperties}
              className="border-b border-line first:border-t lg:col-start-1 lg:[grid-row-start:var(--row)]"
            >
              <button
                type="button"
                id={triggerId}
                aria-expanded={open}
                aria-controls={panelId}
                data-state={open ? "open" : "closed"}
                onClick={() => select(index)}
                className="group relative flex w-full items-center text-left"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-4 left-0 hidden w-px origin-center scale-y-0 bg-signal-400 shadow-[0_0_12px_rgb(197_240_74/0.8)] transition-transform duration-500 ease-out-expo group-data-[state=open]:scale-y-100 lg:block"
                />
                {item.header}
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!open}
              className="pt-1 pb-8 lg:sticky lg:top-28 lg:col-start-2 lg:row-span-7 lg:row-start-1 lg:self-start lg:pt-0 lg:pb-0"
            >
              <div className="surface animate-rise rounded-3xl p-3 shadow-card [--rise-y:12px] [--surface-bg:var(--color-ink-850)] sm:p-4">
                {open ? item.diagram : null}
                {item.panel}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
