import tabsStyles from "./tabs.module.css";
import { Tabs } from "@mantine/core";

export const StyledTabs = Tabs.extend({
  classNames: tabsStyles,
  vars: () => {
    return {
      root: {
        "--tabs-color": "var(--mantine-color-primary-9)",
      },
    };
  },
});
