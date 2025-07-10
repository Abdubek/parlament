import { Breadcrumbs } from "@/features/breadcrumbs";
import { Stack, Title } from "@mantine/core";

export function SessionsPage() {
  return (
    <Stack gap={8}>
      <Breadcrumbs startIndex={2} />
      <div>
        <Title order={1}>Отырыс (Заседания)</Title>
      </div>
    </Stack>
  );
}
