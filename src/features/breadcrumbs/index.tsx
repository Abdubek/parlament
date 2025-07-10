import { Link } from "@tanstack/react-router";
import { Anchor, Text, Breadcrumbs as MantineBreadcrumbs } from "@mantine/core";
import { useBreadcrumbs } from "./use-breadcrumbs";

type Props = {
  startIndex?: number;
};

export function Breadcrumbs({ startIndex = 0 }: Props) {
  const [breadcrumbs] = useBreadcrumbs(startIndex);

  const items = breadcrumbs.map(({ label, href }, index) => {
    const isLast = index === breadcrumbs.length - 1;

    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    if (isLast) {
      return (
        <Text key={href} fw={500} c="dimmed">
          {capitalizedLabel}
        </Text>
      );
    }

    return (
      <Anchor
        key={href}
        component={Link}
        href={href}
        underline="hover"
        c="link.10"
        fz={14}
      >
        {capitalizedLabel}
      </Anchor>
    );
  });

  return <MantineBreadcrumbs>{items}</MantineBreadcrumbs>;
}
