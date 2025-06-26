import "@mantine/core/styles";
import { MantineThemeOverride } from "@mantine/core";

declare module "@mantine/dates" {
  export interface TextProps {
    variant?: "title" | "subtitle" | "body" | "caption" | "tagline";
  }
}
