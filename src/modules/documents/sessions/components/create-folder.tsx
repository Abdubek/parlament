import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs, { Dayjs } from "dayjs";
import { useKnowledgeCreateSubSectionFolder } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import { useBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs.ts";

interface FormValues {
  nameKz: string;
  nameRu: string;
  meetingDate: Dayjs | null;
}

export const CreateFolderModal = () => {
  const queryClient = useQueryClient();
  const [opened, { close, open }] = useDisclosure(false);
  const breadcrumbs = useBreadcrumbs();
  const parentSectionId = breadcrumbs[breadcrumbs.length - 1].meta?.sectionId;
  const parentFolderId = breadcrumbs[breadcrumbs.length - 1].meta?.folderId;

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
        close();
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
    <>
      <Box>
        <Button size="lg" variant="filled" onClick={open}>
          Добавить папку
        </Button>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Добавить папку</Title>}
        size="md"
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
                form.values.meetingDate
                  ? form.values.meetingDate.toDate()
                  : null
              }
              onChange={(value) =>
                form.setFieldValue("meetingDate", value ? dayjs(value) : null)
              }
              placeholder="дд.мм.гггг"
              valueFormat="DD.MM.YYYY"
              rightSectionWidth={0}
            />

            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={close} type="button">
                Отмена
              </Button>
              <Button variant="filled" type="submit">
                Сохранить
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
