import { Button, Card, Flex, Menu, Skeleton } from "@mantine/core";
import { useGetSections } from "@/modules/documents/sessions/hooks/use-get-sections.ts";
import type { SectionDto } from "@/shared/api/generated/knowledge/model";
import { sessionsRoute } from "@/modules/documents/sessions/index.tsx";
import { useEffect } from "react";
import { setBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";

export const MenuCard = () => {
  const { _splat } = sessionsRoute.useParams() as { _splat?: string };
  const splat: string | undefined = _splat;
  const activeSectionId = splat?.split("/")[0];

  const sections = useGetSections();

  const navigate = sessionsRoute.useNavigate();

  useEffect(() => {
    setBreadcrumbs(
      sections?.content?.reduce(
        (acc, section) => {
          if (section?.id) {
            acc[section.id] = { label: section.name_ru ?? "" };
          }
          return acc;
        },
        {} as Record<string, { label: string }>,
      ) || {},
    );
  }, [sections]);

  useEffect(() => {
    if (!activeSectionId && sections?.content?.length) {
      const firstId = sections.content[0].id;
      navigate({
        to: String(firstId),
        params: true, // keep existing params (none besides splat)
        search: true, // keep current search params if any
        replace: true,
      });
    }
  }, [activeSectionId, sections, navigate]);

  if (!sections) {
    return <Skeleton height={68} />;
  }

  return (
    <Card>
      <Flex gap={8}>
        {sections?.content?.map((section) => (
          <SectionMenu
            section={section}
            key={section.id}
            activeSectionId={activeSectionId}
          />
        ))}
      </Flex>
    </Card>
  );
};

const SectionMenu = ({
  section,
  activeSectionId,
}: {
  section: SectionDto;
  activeSectionId?: string;
}) => {
  const isActive = String(section.id) === activeSectionId;

  return (
    <Menu>
      <Menu.Target>
        <Button variant={isActive ? "filled" : "outline"}>
          {section.name_ru}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>Settings</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
