import { DateInput } from "@mantine/dates";
import dateInputStyles from "./date-input.module.css";

export const StyledDateInput = DateInput.extend({
  classNames: dateInputStyles,
  vars: (_, props) => {
    const common = {
      "--input-bg": "#FBFEFF",
      "--input-bd": "var(--mantine-color-grey2-3)",
      "--input-bd-focus": "var(--mantine-color-primary-9)",
    };
    if (props.size === "lg") {
      return {
        wrapper: {
          ...common,
          "--input-height": "48px",
        },
      };
    }

    return {
      wrapper: {
        ...common,
      },
    };
  },
  defaultProps: {
    size: "lg",
  },
});
