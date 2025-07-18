import { Dropzone } from "@mantine/dropzone";
import dropzoneStyles from "./dropzone.module.css";

export const StyledDropzone = Dropzone.extend({
  classNames: dropzoneStyles,
});
