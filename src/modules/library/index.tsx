import { createRoute } from "@tanstack/react-router";
import { authedRoute } from "@/app/main";
import LocalLibrary from "@/shared/icons/local_library.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const libraryRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/library",
  component: () => <div>Библиотека</div>,
});

export const libraryNavbarItem: NavbarItem = {
  icon: <LocalLibrary />,
  label: "Библиотека",
  value: "/cabinet/library",
};
