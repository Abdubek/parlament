import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import AccountBalance from "@/shared/icons/account_balance.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const museumRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/museum",
  component: () => <div>Музей</div>,
});

export const museumNavbarItem: NavbarItem = {
  icon: <AccountBalance />,
  label: "Музей",
  value: "/cabinet/museum",
};
