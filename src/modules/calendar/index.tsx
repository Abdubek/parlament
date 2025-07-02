import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Event from "@/shared/icons/event.svg?react";
import type { NavbarItem } from "@/features/navbar";
import { CalendarLayout } from "./layout";
import { CalendarPage } from "./pages/calendar.page";

export const calendarRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/calendar",
  component: () => <CalendarLayout />,
});

calendarRoute.addChildren([
  createRoute({
    getParentRoute: () => calendarRoute,
    path: "/",
    component: () => <CalendarPage />,
  }),
]);

export const calendarNavbarItem: NavbarItem = {
  icon: <Event />,
  label: "Календарь",
  value: "/cabinet/calendar",
  children: [
    {
      label: "Персонализированный календарь",
      value: "/cabinet/calendar",
    },
    {
      label: "Календарь рабочей группы",
      value: "/cabinet/calendar/group",
    },
    {
      label: "Календарь моего отдела",
      value: "/cabinet/calendar/department",
    },
    {
      label: "План мероприятий",
      value: "/cabinet/calendar/plan",
    },
    {
      label: "Занятость зала заседания",
      value: "/cabinet/calendar/room",
    },
    {
      label: "План основных мероприятий",
      value: "/cabinet/calendar/main-events",
    },
    {
      label: "Настройки календаря",
      value: "/cabinet/calendar/settings",
    },
  ],
};
