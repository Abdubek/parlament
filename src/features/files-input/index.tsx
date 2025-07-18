import { Center, InputLabel, Stack, Text } from "@mantine/core";
import {
  Dropzone,
  type DropzoneProps,
  type FileRejection,
} from "@mantine/dropzone";
import FileUploadIcon from "@/shared/icons/file_upload.svg";

interface FilesInputProps extends Partial<DropzoneProps> {
  label?: string;
}

export const FilesInput = ({ label, ...props }: FilesInputProps) => {
  const handleDrop = (files: File[]) => {
    console.log("accepted files", files);
  };

  const handleReject = (files: FileRejection[]) => {
    console.log("rejected files", files);
  };

  return (
    <Stack gap={4}>
      <InputLabel>{label}</InputLabel>
      <Dropzone onDrop={handleDrop} onReject={handleReject} {...props}>
        <Stack gap={8} align="center">
          <Center bg="grey1.2" w={64} h={64} bdrs="100%">
            <FileUploadIcon />
          </Center>
          <Text size="body" fw={500}>
            Перетащите сюда файлы для вложения или 
            <Text span c="primary.9">
              нажмите для выбора
            </Text>
          </Text>
        </Stack>
      </Dropzone>
    </Stack>
  );
};
