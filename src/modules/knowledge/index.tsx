import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Inventory2 from "@/shared/icons/inventory_2.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const knowledgeRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/knowledge",
  component: () => <div>Knowledge</div>,
});

export const knowledgeNavbarItem: NavbarItem = {
  icon: <Inventory2 />,
  label: "База знаний",
  value: "/cabinet/knowledge",
  children: [
    {
      label: "База знаний",
      value: "/cabinet/knowledge",
    },
    {
      label: "Информационный фонд",
      value: "/cabinet/knowledge/information-fund",
    },
    {
      label: "Образцы документов",
      value: "/cabinet/knowledge/documents",
    },
  ],
};
