import { ModuleTabs } from "@/features/module-tabs";
import { Outlet } from "@tanstack/react-router";
import { calendarNavbarItem } from ".";
import { Box } from "@mantine/core";

export const CalendarLayout = () => {
  return (
    <Box px={24} py={32}>
      <ModuleTabs
        items={calendarNavbarItem.children!.map((item) => ({
          label: item.label,
          value: item.value,
        }))}
      />
      <Outlet />
    </Box>
  );
};
