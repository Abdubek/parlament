import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Workspaces from "@/shared/icons/workspaces.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const administrationRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/administration",
  component: () => <div>Администрирование</div>,
});

export const administrationNavbarItem: NavbarItem = {
  icon: <Workspaces />,
  label: "Администрирование",
  value: "/cabinet/administration",
};
