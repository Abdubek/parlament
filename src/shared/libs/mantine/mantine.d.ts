import "@mantine/core/styles";
import { MantineThemeOverride } from "@mantine/core";

declare module "@mantine/dates" {
  export interface TextProps {
    variant?: "title" | "subtitle" | "body" | "caption" | "tagline";
  }
}

declare module "@mantine/core" {
  export interface AccordionProps {
    variant?: "separated" | "contained" | "filled" | "default" | "navbar";
  }

  export interface TabsProps {
    variant?: "default" | "outline" | "pills" | "navbar";
  }
}
