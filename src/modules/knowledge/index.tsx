import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import Inventory2 from "@/shared/icons/inventory_2.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const knowledgeRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "knowledge",
  component: () => <div>Knowledge</div>,
});

export const knowledgeNavbarItem: NavbarItem = {
  icon: <Inventory2 />,
  label: "База знаний",
  value: "/knowledge",
  children: [
    {
      label: "База знаний",
      value: "/knowledge",
    },
    {
      label: "Информационный фонд",
      value: "/knowledge/information-fund",
    },
    {
      label: "Образцы документов",
      value: "/knowledge/documents",
    },
  ],
};
