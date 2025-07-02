import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Notifications from "@/shared/icons/notifications.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const feedRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/feed",
  component: () => <div>Лента</div>,
});

export const feedNavbarItem: NavbarItem = {
  icon: <Notifications />,
  label: "Лента",
  value: "/cabinet/feed",
};
