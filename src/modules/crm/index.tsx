import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Dashboard from "@/shared/icons/dashboard.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const crmRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/crm",
  component: () => <div>CRM</div>,
});

export const crmNavbarItem: NavbarItem = {
  icon: <Dashboard />,
  label: "CRM",
  value: "/cabinet/crm",
};
