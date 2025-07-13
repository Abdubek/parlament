import { Pagination } from "@mantine/core";
import paginationStyles from "./pagination.module.css";

export const StyledPagination = Pagination.extend({
  classNames: paginationStyles,
  vars: (_, props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vars: any = {
      root: {
        "--pagination-active-bg": "var(--mantine-color-primary-9)",
      },
    };
    if (props.size === "lg") {
      vars.root = {
        ...vars.root,
        "--pagination-control-size-lg": "calc(2.5rem * var(--mantine-scale))",
      };
    }
    return vars;
  },
});
