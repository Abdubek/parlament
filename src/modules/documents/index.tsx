import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Topic from "@/shared/icons/topic.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const documentsRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/documents",
  component: () => <div>Документооборот</div>,
});

export const documentsNavbarItem: NavbarItem = {
  icon: <Topic />,
  label: "Документооборот",
  value: "/cabinet/documents",
};
