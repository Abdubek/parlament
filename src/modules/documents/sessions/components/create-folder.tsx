import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs, { Dayjs } from "dayjs";
import type { FC } from "react";
import {
  useKnowledgeCreateSubSectionFolder,
  useKnowledgeGetSection,
} from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useSectionParams } from "../hooks/use-section-params";

interface FormValues {
  nameKz: string;
  nameRu: string;
  meetingDate: Dayjs | null;
}

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFolderModal: FC<CreateFolderModalProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const { lastSectionId: parentSectionId } = useSectionParams();
  const { data: sectionData } = useKnowledgeGetSection(parentSectionId ?? "", {
    query: { staleTime: 5 * 60 * 1000 },
  });
  const parentFolderId = sectionData?.folder_id ?? "";

  const { mutate: createFolder } = useKnowledgeCreateSubSectionFolder({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/section/get-all/${parentSectionId}`],
        });
        queryClient.invalidateQueries({
          queryKey: [`/api/v1/question/${parentSectionId}`],
        });
        form.reset();
        onClose();
      },
    },
  });

  const form = useForm<FormValues>({
    initialValues: {
      nameKz: "",
      nameRu: "",
      meetingDate: null,
    },
    validate: {
      nameKz: (value) => (value.trim().length ? null : "Введите название"),
      nameRu: (value) => (value.trim().length ? null : "Введите название"),
    },
  });

  const handleSubmit = (values: FormValues) => {
    createFolder({
      data: {
        name_kz: values.nameKz,
        name_ru: values.nameRu,
        meeting_date: values.meetingDate?.toISOString(),
        parent_folder_id: parentFolderId,
        parent_section_id: parentSectionId,
      },
    });
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={
        <Text variant="title" fw={600}>
          Добавить папку
        </Text>
      }
      size="lg"
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Наименование на казахском"
            placeholder="Введите наименование"
            {...form.getInputProps("nameKz")}
          />

          <TextInput
            label="Наименование на русском языке"
            placeholder="Введите наименование"
            {...form.getInputProps("nameRu")}
          />

          <DateInput
            label="Дата заседания"
            value={
              form.values.meetingDate ? form.values.meetingDate.toDate() : null
            }
            onChange={(value) =>
              form.setFieldValue("meetingDate", value ? dayjs(value) : null)
            }
            size="lg"
            placeholder="дд.мм.гггг"
            valueFormat="DD.MM.YYYY"
            rightSectionWidth={0}
          />

          <Group justify="flex-end" gap="sm">
            <Button variant="outline" size="md" onClick={onClose} type="button">
              Отмена
            </Button>
            <Button variant="filled" size="md" type="submit">
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export const CreateFolder: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box>
        <Button size="lg" variant="filled" onClick={open}>
          Добавить папку
        </Button>
      </Box>

      <CreateFolderModal open={opened} onClose={close} />
    </>
  );
};
