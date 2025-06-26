import appShellStyles from "./app-shell.module.css";
import { AppShell } from "@mantine/core";

export const StyledAppShell = AppShell.extend({
  classNames: appShellStyles,
});
