import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Topic from "@/shared/icons/topic.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const workflowRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/workflow",
  component: () => <div>Документооборот</div>,
});

export const workflowNavbarItem: NavbarItem = {
  icon: <Topic />,
  label: "Документооборот",
  value: "/cabinet/workflow",
};
