import { MantineProvider as MantineProviderBase } from "@mantine/core";
import { secondTheme } from "./theme";
import type { PropsWithChildren } from "react";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/ru";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";

export const MantineProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineProviderBase theme={secondTheme}>
      <DatesProvider settings={{ locale: "ru" }}>{children}</DatesProvider>
    </MantineProviderBase>
  );
};
