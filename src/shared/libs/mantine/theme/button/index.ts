import { Button } from "@mantine/core";

export const StyledButton = Button.extend({
  vars: (_, props) => {
    const common = {
      "--button-radius": "8px",
    };

    if (props.variant === "filled") {
      return {
        root: {
          ...common,
          "--button-bg": "var(--mantine-color-primary-9)",
          "--button-hover": "var(--mantine-color-primary-10)",
        },
      };
    }

    if (props.variant === "outline") {
      return {
        root: {
          ...common,
          "--button-bd": "1px solid var(--mantine-color-primary-9)",
          "--button-color": "var(--mantine-color-primary-9)",
        },
      };
    }
    if (props.size === "lg") {
      return {
        root: {
          ...common,
          "--button-height": "48px",
          "--button-fz": "16px",
          "--button-padding-x": "32px",
        },
      };
    }

    return { root: common };
  },
});
