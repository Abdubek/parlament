import { Text } from "@mantine/core";

export const StyledText = Text.extend({
  vars: (_, props) => {
    const { variant } = props;

    switch (variant) {
      case "title":
        return {
          root: {
            "--text-fz": "18px",
            "--text-lh": "26px",
          },
        };
      case "subtitle":
        return {
          root: {
            "--text-fz": "16px",
            "--text-lh": "24px",
          },
        };
      case "body":
        return {
          root: {
            "--text-fz": "14px",
            "--text-lh": "22px",
          },
        };
      case "caption":
        return {
          root: {
            "--text-fz": "12px",
            "--text-lh": "18px",
          },
        };
      case "tagline":
        return {
          root: {
            "--text-fz": "10px",
            "--text-lh": "14px",
          },
        };
    }

    return { root: {} };
  },
  styles: {},
});
