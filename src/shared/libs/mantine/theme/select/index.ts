import { Select } from "@mantine/core";
import selectStyles from "./select.module.css";

export const StyledSelect = Select.extend({
  classNames: selectStyles,
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
