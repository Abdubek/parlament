import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import StickyNote2 from "@/shared/icons/sticky_note_2.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const legislationRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/legislation",
  component: () => <div>Нормотворчество</div>,
});

export const legislationNavbarItem: NavbarItem = {
  icon: <StickyNote2 />,
  label: "Нормотворчество",
  value: "/cabinet/legislation",
};
