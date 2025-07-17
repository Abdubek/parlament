import { Link, useLocation } from "@tanstack/react-router";
import {
  Anchor,
  Text,
  Breadcrumbs as MantineBreadcrumbs,
  Skeleton,
} from "@mantine/core";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";

export type BreadcrumbEntry = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  startIndex?: number;
  resolver: (id: string, index: number) => Promise<BreadcrumbEntry>;
}

type BreadcrumbState = {
  entry: BreadcrumbEntry | null;
  isLoading: boolean;
  error: string | null;
};

export const Breadcrumbs = ({ startIndex = 0, resolver }: BreadcrumbsProps) => {
  const location = useLocation();
  const [breadcrumbStates, setBreadcrumbStates] = useState<BreadcrumbState[]>(
    [],
  );

  const resolverRef = useRef(resolver);
  resolverRef.current = resolver;

  const pathSegments = useMemo(() => {
    return location.pathname.split("/").filter(Boolean).slice(startIndex);
  }, [location.pathname, startIndex]);

  const loadBreadcrumbs = useCallback(async () => {
    if (pathSegments.length === 0) {
      setBreadcrumbStates([]);
      return;
    }

    // Initialize all segments as loading
    setBreadcrumbStates(
      pathSegments.map(() => ({
        entry: null,
        isLoading: true,
        error: null,
      })),
    );

    // Load each segment independently
    pathSegments.forEach(async (segment, index) => {
      try {
        const entry = await resolverRef.current(segment, index);
        setBreadcrumbStates((prev) =>
          prev.map((state, i) =>
            i === index ? { entry, isLoading: false, error: null } : state,
          ),
        );
      } catch (err) {
        console.error(`Error loading breadcrumb for segment ${segment}:`, err);
        setBreadcrumbStates((prev) =>
          prev.map((state, i) =>
            i === index
              ? {
                  entry: { label: segment, href: "" },
                  isLoading: false,
                  error: err instanceof Error ? err.message : "Failed to load",
                }
              : state,
          ),
        );
      }
    });
  }, [pathSegments]);

  useEffect(() => {
    loadBreadcrumbs();
  }, [loadBreadcrumbs]);

  if (pathSegments.length === 0) {
    return null;
  }

  const items = breadcrumbStates.map((state, index) => {
    const isLast = index === breadcrumbStates.length - 1;

    if (state.isLoading) {
      return (
        <Skeleton
          key={`skeleton-${index}`}
          height={14}
          width={index === 0 ? 120 : 80} // First segment typically longer
        />
      );
    }

    if (state.error || !state.entry) {
      return (
        <Text key={`error-${index}`} c="red" fz={14}>
          Ошибка
        </Text>
      );
    }

    const capitalizedLabel =
      state.entry.label.charAt(0).toUpperCase() + state.entry.label.slice(1);

    if (isLast) {
      return (
        <Text key={state.entry.href} fw={500} fz={14} c="dimmed">
          {capitalizedLabel}
        </Text>
      );
    }

    return (
      <Anchor
        key={state.entry.href}
        component={Link}
        href={state.entry.href}
        underline="hover"
        c="link.10"
        fz={14}
      >
        {capitalizedLabel}
      </Anchor>
    );
  });

  return <MantineBreadcrumbs>{items}</MantineBreadcrumbs>;
};
