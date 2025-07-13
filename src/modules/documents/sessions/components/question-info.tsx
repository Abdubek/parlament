import {
  Avatar,
  Card,
  Flex,
  Stack,
  Text,
  ActionIcon,
  SimpleGrid,
  Group,
  Center,
  Title,
} from "@mantine/core";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import FolderSvg from "@/shared/icons/folder_material_open.svg";
import TrashSvg from "@/shared/icons/trash.svg";
import EditSvg from "@/shared/icons/edit.svg";
import FolderIcon from "@/shared/icons/folder.svg";
import { CreateFolder } from "./create-folder.tsx";
import { useSectionParams } from "../hooks/use-section-params";
import { useGetQuestions } from "../hooks/use-get-questions";
import { useHover } from "@mantine/hooks";

export const QuestionInfo = () => {
  const { lastSectionId, level } = useSectionParams();
  const { data } = useGetQuestions(lastSectionId ?? "");

  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  if (level !== 4 || !data) {
    return null;
  }

  return (
    <Stack gap={32}>
      <Group wrap="wrap" gap={24}>
        {data.members?.map((member, index) => (
          <Flex
            key={index}
            align="center"
            gap={16}
            style={{ flex: "1 1 240px" }}
          >
            <Avatar size={88} />
            <Stack gap={4}>
              <Text fz="xl" fw={600}>
                {member.name}
              </Text>
              <Text c="text.6">
                {member.type === "MAIN_SPEAKER" ? "Докладчик" : "Содокладчик"}
              </Text>
            </Stack>
          </Flex>
        ))}
      </Group>

      {data.folders?.length ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={24}>
          {data.folders?.map((folder) => (
            <FolderCard
              key={folder.id}
              name={folder.name_ru || folder.name_kz || ""}
              onClick={() =>
                navigate({
                  to: `${location.pathname.replace(/\/$/, "")}/${folder.id}`,
                })
              }
              onEdit={() => alert(`Edit ${folder.name_ru || folder.name_kz}`)}
              onDelete={() =>
                alert(`Delete ${folder.name_ru || folder.name_kz}`)
              }
            />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState />
      )}
    </Stack>
  );
};

const EmptyState = () => {
  return (
    <Center h="500px">
      <Stack gap={32} align="center">
        <Flex
          bg="grey1.1"
          c="grey1.3"
          bdrs="100%"
          w={240}
          h={240}
          align="center"
          justify="center"
        >
          <FolderIcon width={96} height={96} />
        </Flex>

        <Title order={3} fw={400} ta="center">
          В данном вопросе папок
        </Title>

        <Flex gap={16} wrap="wrap" justify="center">
          <CreateFolder />
        </Flex>
      </Stack>
    </Center>
  );
};

interface FolderCardProps {
  name: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const FolderCard = ({ name, onEdit, onDelete, onClick }: FolderCardProps) => {
  const { hovered, ref } = useHover();

  return (
    <Card
      ref={ref}
      withBorder={hovered}
      bd={hovered ? "1px solid primary.9" : "1px solid transparent"}
      radius="lg"
      p={16}
      style={{ cursor: "pointer", position: "relative" }}
      onClick={onClick}
    >
      {hovered && (
        <Stack gap={8} style={{ position: "absolute", top: 16, right: 16 }}>
          <ActionIcon
            variant="outline"
            color="primary.9"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            size="lg"
          >
            <TrashSvg />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="primary.9"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            size="lg"
          >
            <EditSvg />
          </ActionIcon>
        </Stack>
      )}
      <Stack gap={16}>
        <Center style={{ height: 153 }}>
          <FolderSvg width={96} height={96} />
        </Center>
        <Text
          w="100%"
          fw={500}
          fz={15}
          lh={1.2}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            maxHeight: 67.5,
          }}
        >
          {name}
        </Text>
      </Stack>
    </Card>
  );
};
