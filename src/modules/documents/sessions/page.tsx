import { Breadcrumbs } from "@/features/breadcrumbs";
import { Stack, Title } from "@mantine/core";
import { useGetSections } from "./use-get-sections";
import { useBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";
import { useEffect } from "react";

export function SessionsPage() {
  const [, setBreadcrumb] = useBreadcrumbs();
  const sections = useGetSections();

  useEffect(() => {
    setBreadcrumb("sessions", { label: "Отырыс (Заседания)" });
  }, [setBreadcrumb]);

  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} />
      <div>
        <Title order={1}>Отырыс (Заседания)</Title>
      </div>
    </Stack>
  );
}
