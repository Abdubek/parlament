import { Button, Card, Flex, Menu, Skeleton } from "@mantine/core";
import { useGetSections } from "@/modules/documents/sessions/hooks/use-get-sections.ts";
import type { SectionDto } from "@/shared/api/generated/knowledge/model";
import { sessionsRoute } from "@/modules/documents/sessions/index.tsx";
import { useEffect } from "react";
import { setBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";
import ChevronRightIcon from "@/shared/icons/chevron.svg";
import { useGetSubsections } from "../hooks/use-get-subsections";

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
        search: true,
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
  const navigate = sessionsRoute.useNavigate();
  const subsections = useGetSubsections(section.id ?? "");

  useEffect(() => {
    setBreadcrumbs(
      subsections?.content?.reduce(
        (acc, subsection) => {
          if (subsection?.id) {
            acc[subsection.id] = { label: subsection.name_ru ?? "" };
          }
          return acc;
        },
        {} as Record<string, { label: string }>,
      ) || {},
    );
  }, [subsections]);

  return (
    <Menu>
      <Menu.Target>
        <Button
          variant={isActive ? "filled" : "outline"}
          rightSection={
            <ChevronRightIcon
              width={16}
              height={16}
              style={{ transform: "rotate(90deg)" }}
            />
          }
        >
          {section.name_ru}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {subsections?.content?.map((subsection) => (
          <Menu.Item
            key={subsection.id}
            onClick={() => {
              navigate({
                to: `${sessionsRoute.fullPath.replace("/$", "")}/${section.id}/${subsection.id}`,
                search: true,
              });
            }}
          >
            {subsection.name_ru}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
