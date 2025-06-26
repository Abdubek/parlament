import { Title } from "@mantine/core";

export const StyledTitle = Title.extend({
  vars: (_, props) => {
    switch (props.order) {
      case 1:
        return {
          root: {
            "--title-fz": "38px",
            "--title-fw": "600",
            "--title-lh": "46px",
          },
        };
      case 2:
        return {
          root: {
            "--title-fz": "30px",
            "--title-fw": "600",
            "--title-lh": "38px",
          },
        };
      case 3:
        return {
          root: {
            "--title-fz": "24px",
            "--title-fw": "600",
            "--title-lh": "32px",
          },
        };
      case 4:
        return {
          root: {
            "--title-fz": "20px",
            "--title-fw": "600",
            "--title-lh": "28px",
          },
        };
    }

    return { root: {} };
  },
  styles: {},
});
