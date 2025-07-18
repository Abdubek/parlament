import { Flex, ActionIcon, Center, Stack, Title, Text } from "@mantine/core";
import dayjs from "dayjs";
import DocumentIcon from "@/shared/icons/document.svg";
import DotsIcon from "@/shared/icons/dots.svg";
import { useSectionParams } from "../hooks/use-section-params";
import { useGetSubsections } from "../hooks/use-get-subsections";
import FolderIcon from "@/shared/icons/folder.svg";
import { CreateFolder } from "./create-folder.tsx";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { DataTable, type DataTableColumnTextAlign } from "mantine-datatable";
import type { SectionDto } from "@/shared/api/generated/knowledge/model";
import { useDataTableProps } from "@/shared/libs/mantine/hooks/use-data-table-props.ts";
import { CreateQuestion } from "./create-question.tsx";
import { type PropsWithChildren } from "react";
import { FilesInput } from "@/features/files-input/index.tsx";
import { useUploadFile } from "../hooks/use-upload-file.ts";

const columns = [
  {
    title: "Наименование",
    accessor: "name_ru",
    render: (record: SectionDto) => (
      <Text c="primary.9">
        <Flex align="center" gap={32} component="span">
          {record.type === "FOLDER" ? (
            <FolderIcon width={32} height={32} />
          ) : (
            <DocumentIcon />
          )}
          {record.name_ru}
        </Flex>
      </Text>
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
  const { handleUploadFile, isPending } = useUploadFile();

  const { lastSectionId, level } = useSectionParams();

  const { data: subsections, isLoading } = useGetSubsections(
    lastSectionId ?? "",
    {
      page: page - 1,
      size: pageSize,
    },
  );

  const isFirstLayer = level === 1;
  const isQuestionLayer = level === 4;
  const isCanCreateQuestion = level === 3;
  const isCanCreateFolder = level === 2;
  const isCanUploadFile = level === 5;

  if (isFirstLayer || isQuestionLayer) {
    return null;
  }

  if (!subsections?.content?.length) {
    return (
      <>
        <EmptyState>
          {isCanCreateFolder ? <CreateFolder /> : null}
          {isCanCreateQuestion ? <CreateQuestion /> : null}
        </EmptyState>

        {isCanUploadFile ? (
          <Flex>
            <FilesInput
              label="Файлы на казахском и русском языках"
              onDrop={handleUploadFile}
              loading={isPending}
            />
          </Flex>
        ) : null}
      </>
    );
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
        {isCanCreateFolder ? <CreateFolder /> : null}
        {isCanCreateQuestion ? <CreateQuestion /> : null}
        {isCanUploadFile ? (
          <FilesInput
            label="Файлы на казахском и русском языках"
            onDrop={handleUploadFile}
            loading={isPending}
          />
        ) : null}
      </Flex>
    </>
  );
};

const EmptyState = ({ children }: PropsWithChildren) => {
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

        <Flex gap={16}>{children}</Flex>
      </Stack>
    </Center>
  );
};
