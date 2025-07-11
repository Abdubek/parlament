import {
  Table,
  Flex,
  ActionIcon,
  Center,
  Stack,
  Title,
  Button,
} from "@mantine/core";
import dayjs from "dayjs";
import DocumentIcon from "@/shared/icons/document.svg";
import DotsIcon from "@/shared/icons/dots.svg";
import { useSectionParams } from "../hooks/use-section-params";
import { useGetSubsections } from "../hooks/use-get-subsections";
import FolderIcon from "@/shared/icons/folder.svg";

export const FolderTable = () => {
  const { lastSectionId, level } = useSectionParams();

  const subsections = useGetSubsections(lastSectionId ?? "");

  if (level === 1) {
    return null;
  }

  if (!subsections?.content?.length) {
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
            <FolderIcon />
          </Flex>

          <Title order={3} fw={400}>
            В данной папке нет файлов или папок
          </Title>

          <Button variant="filled" size="md">
            Создать
          </Button>
        </Stack>
      </Center>
    );
  }

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Наименование</Table.Th>
          <Table.Th>Дата</Table.Th>
          <Table.Th style={{ width: 120 }}>Действие</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {subsections?.content?.map((row) => (
          <Table.Tr key={row.id}>
            <Table.Td>
              <Flex align="center" gap={32}>
                <DocumentIcon />
                {row.name_ru}
              </Flex>
            </Table.Td>
            <Table.Td>{dayjs(row.date).format("DD.MM.YYYY")}</Table.Td>
            <Table.Td align="right">
              <ActionIcon variant="transparent" color="black">
                <DotsIcon />
              </ActionIcon>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
