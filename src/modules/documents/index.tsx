import { authedRoute } from "@/app/main";
import { createRoute, Outlet } from "@tanstack/react-router";
import Topic from "@/shared/icons/topic.svg?react";
import type { NavbarItem } from "@/features/navbar";
import { sessionsRoute } from "./sessions";

export const documentsRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/documents",
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

documentsRoute.addChildren([sessionsRoute]);

export const documentsNavbarItem: NavbarItem = {
  icon: <Topic />,
  label: "Документооборот",
  value: "/cabinet/documents",
  children: [
    {
      label: "Отырыс (Заседания)",
      value: "/cabinet/documents/sessions",
    },
  ],
};
