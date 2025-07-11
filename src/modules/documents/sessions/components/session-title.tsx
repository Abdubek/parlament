import { useBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";
import { Title } from "@mantine/core";

export const SessionTitle = () => {
  const breadcrumbs = useBreadcrumbs(2);

  return <Title order={1}>{breadcrumbs[breadcrumbs.length - 1].label}</Title>;
};
