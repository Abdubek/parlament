import { useLocation } from "@tanstack/react-router";
import { useMemo, useSyncExternalStore } from "react";

export type BreadcrumbEntry = {
  label: string;
  href?: string;
  meta?: Record<string, string>;
};
type Store = Record<string, BreadcrumbEntry>;

let breadcrumbStore: Store = {};
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

export function setBreadcrumb(id: string, data: BreadcrumbEntry) {
  breadcrumbStore = { ...breadcrumbStore, [id]: data };
  emitChange();
}

export function setBreadcrumbs(data: Record<string, BreadcrumbEntry>) {
  breadcrumbStore = { ...breadcrumbStore, ...data };
  emitChange();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return breadcrumbStore;
}

export function useBreadcrumbs(startIndex: number = 0): BreadcrumbEntry[] {
  const location = useLocation();
  const pathname = location.pathname;

  const store = useSyncExternalStore(subscribe, getSnapshot);

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: BreadcrumbEntry[] = [];

    const start = Math.max(0, Math.min(startIndex, segments.length));

    for (let i = start; i < segments.length; i++) {
      const segment = segments[i];
      const href = "/" + segments.slice(0, i + 1).join("/");
      const entry = store[segment];

      crumbs.push({
        label: entry?.label ?? segment,
        href: entry?.href ?? href,
        meta: entry?.meta ?? {},
      });
    }

    return crumbs;
  }, [pathname, store, startIndex]);
}
