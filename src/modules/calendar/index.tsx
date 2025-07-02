import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Event from "@/shared/icons/event.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const calendarRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/calendar",
  component: () => <div>Календарь</div>,
});

export const calendarNavbarItem: NavbarItem = {
  icon: <Event />,
  label: "Календарь",
  value: "/cabinet/calendar",
};
