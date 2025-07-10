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

    if (isLast) {
      return (
        <Text key={href} fw={500} c="dimmed">
          {label}
        </Text>
      );
    }

    return (
      <Anchor
        key={href}
        component={Link}
        href={href}
        underline="hover"
        c="blue.6"
      >
        {label}
      </Anchor>
    );
  });

  return <MantineBreadcrumbs>{items}</MantineBreadcrumbs>;
}
