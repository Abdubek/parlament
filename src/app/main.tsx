import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@/shared/libs/mantine";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "./layout";
import { dashboardRoute } from "@/modules/dashboard";
import { knowledgeRoute, knowledgeNavbarItem } from "@/modules/knowledge";
import { feedRoute, feedNavbarItem } from "@/modules/feed";
import { employeesRoute, employeesNavbarItem } from "@/modules/employees";
import { tasksRoute, tasksNavbarItem } from "@/modules/tasks";
import { calendarRoute, calendarNavbarItem } from "@/modules/calendar";
import { crmRoute, crmNavbarItem } from "@/modules/crm";
import { documentsRoute, documentsNavbarItem } from "@/modules/documents";
import { managementRoute, managementNavbarItem } from "@/modules/management";
import { ruleMakingRoute, ruleMakingNavbarItem } from "@/modules/rule-making";
import { analyticsRoute, analyticsNavbarItem } from "@/modules/analytics";
import {
  administrationRoute,
  administrationNavbarItem,
} from "@/modules/administration";
import { museumRoute, museumNavbarItem } from "@/modules/museum";
import { libraryRoute, libraryNavbarItem } from "@/modules/library";
import type { NavbarItem } from "@/features/navbar";

const items: NavbarItem[] = [
  feedNavbarItem,
  employeesNavbarItem,
  tasksNavbarItem,
  calendarNavbarItem,
  crmNavbarItem,
  documentsNavbarItem,
  managementNavbarItem,
  ruleMakingNavbarItem,
  analyticsNavbarItem,
  administrationNavbarItem,
  knowledgeNavbarItem,
  museumNavbarItem,
  libraryNavbarItem,
] as const;

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

export const authedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "_authed/cabinet",
  component: () => <Layout items={items} />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: async () => {
    throw redirect({
      to: "/cabinet",
    });
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  authedRoute.addChildren([
    dashboardRoute,
    feedRoute,
    employeesRoute,
    tasksRoute,
    calendarRoute,
    crmRoute,
    documentsRoute,
    managementRoute,
    ruleMakingRoute,
    analyticsRoute,
    administrationRoute,
    knowledgeRoute,
    libraryRoute,
    museumRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
