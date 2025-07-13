import type { FC } from "react";
import { useMemo, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { useUserGetAll } from "@/shared/api/generated/user/userServiceAPI";
import { useKnowledgeCreateQuestion } from "@/shared/api/generated/knowledge/knowledgeServiceAPI";
import { useBreadcrumbs } from "@/features/breadcrumbs/use-breadcrumbs";

interface CreateQuestionProps {
  open: boolean;
  onClose: () => void;
}

type UserOption = { value: string; label: string };

type SpeakerItem = { user: UserOption | null };

interface FormValues {
  nameKz: string;
  nameRu: string;
  date: Date | null;
  speakers: SpeakerItem[];
  coSpeakers: SpeakerItem[];
}

const CreateQuestionModal: FC<CreateQuestionProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const breadcrumbs = useBreadcrumbs();
  const sectionId = breadcrumbs[breadcrumbs.length - 1].meta?.sectionId ?? "";

  const form = useForm<FormValues>({
    initialValues: {
      nameKz: "",
      nameRu: "",
      date: null,
      speakers: [{ user: null }],
      coSpeakers: [{ user: null }],
    },
    validate: {
      nameKz: (value) => (value.trim() ? null : "Заполните поле"),
      nameRu: (value) => (value.trim() ? null : "Заполните поле"),
      date: (value) => (value ? null : "Выберите дату"),
    },
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const { data: usersPage } = useUserGetAll({ fio: debouncedSearch });

  const userOptions: UserOption[] = useMemo(() => {
    const content = usersPage?.content ?? [];
    return content.map(
      (u: {
        id?: string;
        firstName?: string;
        lastName?: string;
      }): UserOption => ({
        value: u.id ?? "",
        label: `${u.lastName ?? ""} ${u.firstName ?? ""}`.trim(),
      }),
    );
  }, [usersPage]);

  const addSpeaker = () => form.insertListItem("speakers", { user: null });
  const removeSpeaker = (index: number) =>
    form.removeListItem("speakers", index);
  const addCoSpeaker = () => form.insertListItem("coSpeakers", { user: null });
  const removeCoSpeaker = (index: number) =>
    form.removeListItem("coSpeakers", index);

  const { mutate: createQuestion, isPending: saving } =
    useKnowledgeCreateQuestion();

  const handleSubmit = (values: FormValues) => {
    const user_ids: Record<string, "MAIN_SPEAKER" | "CO_SPEAKER"> = {};
    values.speakers.forEach((s) => {
      if (s.user) user_ids[s.user.value] = "MAIN_SPEAKER";
    });
    values.coSpeakers.forEach((s) => {
      if (s.user) user_ids[s.user.value] = "CO_SPEAKER";
    });

    createQuestion(
      {
        sectionId,
        data: {
          name_kz: values.nameKz,
          name_ru: values.nameRu,
          meeting_date: values.date
            ? dayjs(values.date).format("YYYY-MM-DD")
            : "",
          user_ids,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [`/api/v1/section/get-all/${sectionId}`],
          });
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<Title order={4}>Добавить вопрос</Title>}
      size="xl"
      radius="bdrs"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Наименование (KZ)"
            placeholder="На казахском языке"
            {...form.getInputProps("nameKz")}
          />
          <TextInput
            label="Наименование (RU)"
            placeholder="На русском языке"
            {...form.getInputProps("nameRu")}
          />

          <DateInput
            label="Дата заседания"
            placeholder="дд.мм.гггг"
            value={form.values.date}
            onChange={(value: any) =>
              form.setFieldValue("date", value as Date | null)
            }
            locale="ru"
            valueFormat="DD.MM.YYYY"
            error={form.errors.date}
          />

          <Box>
            <Text fw={500} mb="xs">
              Докладчик
            </Text>
            <Stack>
              {form.values.speakers.map((_, index) => (
                <Group key={`speaker-${index}`} align="center" wrap="nowrap">
                  <Select
                    data={userOptions}
                    value={form.values.speakers[index].user?.value ?? null}
                    onChange={(val) => {
                      const option =
                        userOptions.find((o) => o.value === val) || null;
                      form.setFieldValue(`speakers.${index}.user`, option);
                    }}
                    onSearchChange={setSearch}
                    searchable
                    nothingFoundMessage="Не найдено"
                    placeholder="ФИО"
                    style={{ flex: 1 }}
                  />
                  {form.values.speakers.length > 1 && (
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => removeSpeaker(index)}
                    >
                      ✕
                    </ActionIcon>
                  )}
                </Group>
              ))}
              <Button
                variant="subtle"
                leftSection={<span>＋</span>}
                onClick={addSpeaker}
              >
                Добавить докладчика
              </Button>
            </Stack>
          </Box>

          {/* Co-speakers */}
          <Box>
            <Text fw={500} mb="xs">
              Содокладчик
            </Text>
            <Stack>
              {form.values.coSpeakers.map((_, index) => (
                <Group key={`co-speaker-${index}`} align="center" wrap="nowrap">
                  <Select
                    data={userOptions}
                    value={form.values.coSpeakers[index].user?.value ?? null}
                    onChange={(val) => {
                      const option =
                        userOptions.find((o) => o.value === val) || null;
                      form.setFieldValue(`coSpeakers.${index}.user`, option);
                    }}
                    onSearchChange={setSearch}
                    searchable
                    nothingFoundMessage="Не найдено"
                    placeholder="ФИО"
                    style={{ flex: 1 }}
                  />
                  {form.values.coSpeakers.length > 1 && (
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => removeCoSpeaker(index)}
                    >
                      ✕
                    </ActionIcon>
                  )}
                </Group>
              ))}
              <Button
                variant="subtle"
                leftSection={<span>＋</span>}
                onClick={addCoSpeaker}
              >
                Добавить содокладчика
              </Button>
            </Stack>
          </Box>

          <Group justify="flex-end" mt="md">
            <Button variant="outline" onClick={onClose} radius="bdrs">
              Отмена
            </Button>
            <Button type="submit" loading={saving} radius="bdrs">
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export const CreateQuestion = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Box>
        <Button size="lg" variant="filled" onClick={open}>
          Добавить вопрос
        </Button>
      </Box>

      <CreateQuestionModal open={opened} onClose={close} />
    </>
  );
};
