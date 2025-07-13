import { Flex, ActionIcon, Center, Stack, Title } from "@mantine/core";
import dayjs from "dayjs";
import DocumentIcon from "@/shared/icons/document.svg";
import DotsIcon from "@/shared/icons/dots.svg";
import { useSectionParams } from "../hooks/use-section-params";
import {
  useGetSubsections,
  type SubsectionPaginationOptions,
} from "../hooks/use-get-subsections";
import FolderIcon from "@/shared/icons/folder.svg";
import { CreateFolder } from "./create-folder.tsx";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { DataTable, type DataTableColumnTextAlign } from "mantine-datatable";
import type { SectionDto } from "@/shared/api/generated/knowledge/model";
import { useDataTableProps } from "@/shared/libs/mantine/hooks/use-data-table-props.ts";
import { CreateQuestion } from "./create-question.tsx";

const columns = [
  {
    title: "Наименование",
    accessor: "name_ru",
    render: (record: SectionDto) => (
      <Flex align="center" gap={32}>
        <DocumentIcon />
        {record.name_ru}
      </Flex>
    ),
  },
  {
    title: "Дата",
    accessor: "date",
    render: (record: SectionDto) => dayjs(record.date).format("DD.MM.YYYY"),
  },
  {
    title: "Действие",
    accessor: "action",
    textAlign: "right" as DataTableColumnTextAlign,
    render: () => (
      <ActionIcon variant="transparent" color="black">
        <DotsIcon />
      </ActionIcon>
    ),
  },
];

export const FolderTable = () => {
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });
  const { page, pageSize, defaultTableProps } = useDataTableProps();

  const { lastSectionId, level } = useSectionParams();

  const paginationOpts: SubsectionPaginationOptions = {
    page: page - 1,
    size: pageSize,
  };

  const { data: subsections, isLoading } = useGetSubsections(
    lastSectionId ?? "",
    paginationOpts,
  );

  if (level === 1) {
    return null;
  }

  if (!subsections?.content?.length) {
    return <EmptyState />;
  }

  return (
    <>
      <DataTable
        {...defaultTableProps}
        columns={columns}
        records={subsections.content}
        totalRecords={subsections.totalElements ?? subsections.content.length}
        fetching={isLoading}
        onRowClick={({ record }) => {
          navigate({
            to: `${location.pathname.replace(/\/$/, "")}/${record.id}`,
          });
        }}
      />

      <Flex gap={16}>
        <CreateFolder />
        <CreateQuestion />
      </Flex>
    </>
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
          <FolderIcon />
        </Flex>

        <Title order={3} fw={400}>
          В данной папке нет файлов или папок
        </Title>

        <Flex gap={16}>
          <CreateFolder />
          <CreateQuestion />
        </Flex>
      </Stack>
    </Center>
  );
};
