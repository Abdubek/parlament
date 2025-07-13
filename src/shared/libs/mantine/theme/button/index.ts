import { Button } from "@mantine/core";

export const StyledButton = Button.extend({
  vars: (_, props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vars: any = {
      root: {
        "--button-radius": "8px",
      },
    };

    if (props.variant === "filled") {
      vars.root = {
        ...vars.root,
        "--button-bg": "var(--mantine-color-primary-9)",
        "--button-hover": "var(--mantine-color-primary-10)",
      };
    }

    if (props.variant === "outline") {
      vars.root = {
        ...vars.root,
        "--button-bd": "1px solid var(--mantine-color-primary-9)",
        "--button-color": "var(--mantine-color-primary-9)",
      };
    }
    if (props.size === "lg") {
      vars.root = {
        ...vars.root,
        "--button-height": "48px",
        "--button-fz": "16px",
        "--button-padding-x": "32px",
      };
    }
    if (props.size === "md") {
      vars.root = {
        ...vars.root,
        "--button-height": "40px",
        "--button-fz": "14px",
        "--button-padding-x": "16px",
      };
    }

    return vars;
  },
  defaultProps: {
    size: "md",
  },
});
