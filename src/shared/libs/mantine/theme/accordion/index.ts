import accordionStyles from "./accordion.module.css";
import { Accordion } from "@mantine/core";

export const StyledAccordion = Accordion.extend({
  classNames: accordionStyles,
});
