import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import ReduceCapacity from "@/shared/icons/reduce_capacity.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const managementRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/management",
  component: () => <div>Управление персоналом</div>,
});

export const managementNavbarItem: NavbarItem = {
  icon: <ReduceCapacity />,
  label: "Управление персоналом",
  value: "/cabinet/management",
};
