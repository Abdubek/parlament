import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import ChecklistRtl from "@/shared/icons/checklist_rtl.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const tasksRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/tasks",
  component: () => <div>Задачи</div>,
});

export const tasksNavbarItem: NavbarItem = {
  icon: <ChecklistRtl />,
  label: "Задачи",
  value: "/cabinet/tasks",
};
