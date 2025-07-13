import type { MantineSize } from "@mantine/core";
import { useState } from "react";

export const useDataTableProps = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(1);

  return {
    pageSize,
    page,
    defaultTableProps: {
      withRowBorders: false,
      withTableBorder: false,
      paginationSize: "lg" as MantineSize,
      recordsPerPageLabel: "На странице:",
      recordsPerPageOptions: [5, 10, 15, 20, 30, 40, 50],
      recordsPerPage: pageSize,
      page: page,
      onPageChange: setPage,
      onRecordsPerPageChange: setPageSize,
    },
  };
};
