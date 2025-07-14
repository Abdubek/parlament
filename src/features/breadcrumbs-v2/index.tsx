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

export const BreadcrumbsV2 = ({
  startIndex = 0,
  resolver,
}: BreadcrumbsProps) => {
  const location = useLocation();
  const [breadcrumbEntries, setBreadcrumbEntries] = useState<BreadcrumbEntry[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolverRef = useRef(resolver);
  resolverRef.current = resolver;

  const pathSegments = useMemo(() => {
    return location.pathname.split("/").filter(Boolean).slice(startIndex);
  }, [location.pathname, startIndex]);

  const loadBreadcrumbs = useCallback(async () => {
    if (pathSegments.length === 0) {
      setBreadcrumbEntries([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const promises = pathSegments.map((segment, index) =>
        resolverRef.current(segment, index),
      );
      const entries = await Promise.all(promises);
      setBreadcrumbEntries(entries);
    } catch (err) {
      console.error("Error loading breadcrumbs:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load breadcrumbs",
      );
      setBreadcrumbEntries([]);
    } finally {
      setIsLoading(false);
    }
  }, [pathSegments]);

  useEffect(() => {
    loadBreadcrumbs();
  }, [loadBreadcrumbs]);

  if (isLoading) {
    return (
      <MantineBreadcrumbs>
        {pathSegments.map((_, index) => (
          <Skeleton key={index} height={14} width={60} />
        ))}
      </MantineBreadcrumbs>
    );
  }

  if (error) {
    return (
      <MantineBreadcrumbs>
        <Text c="red" fz={14}>
          Не удалось загрузить хлебные крошки
        </Text>
      </MantineBreadcrumbs>
    );
  }

  const items = breadcrumbEntries.map((item, index) => {
    const capitalizedLabel =
      item.label.charAt(0).toUpperCase() + item.label.slice(1);
    const isLast = index === breadcrumbEntries.length - 1;

    if (isLast) {
      return (
        <Text key={item.href} fw={500} fz={14} c="dimmed">
          {capitalizedLabel}
        </Text>
      );
    }

    return (
      <Anchor
        key={item.href}
        component={Link}
        href={item.href}
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
