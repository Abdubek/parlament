import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import PeopleOutline from "@/shared/icons/people_outline.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const employeesRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/employees",
  component: () => <div>Сотрудники</div>,
});

export const employeesNavbarItem: NavbarItem = {
  icon: <PeopleOutline />,
  label: "Сотрудники",
  value: "/cabinet/employees",
};
