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
import AccountBalance from "@/shared/icons/account_balance.svg?react";
import ChecklistRtl from "@/shared/icons/checklist_rtl.svg?react";
import Dashboard from "@/shared/icons/dashboard.svg?react";
import Event from "@/shared/icons/event.svg?react";
import InsertChartOutlined from "@/shared/icons/insert_chart_outlined.svg?react";
import LocalLibrary from "@/shared/icons/local_library.svg?react";
import Notifications from "@/shared/icons/notifications.svg?react";
import PeopleOutline from "@/shared/icons/people_outline.svg?react";
import ReduceCapacity from "@/shared/icons/reduce_capacity.svg?react";
import StickyNote2 from "@/shared/icons/sticky_note_2.svg?react";
import Topic from "@/shared/icons/topic.svg?react";
import Workspaces from "@/shared/icons/workspaces.svg?react";
import type { NavbarItem } from "@/features/navbar";

const items: NavbarItem[] = [
  { icon: <Notifications />, label: "Лента", value: "feed" },
  { icon: <PeopleOutline />, label: "Сотрудники", value: "employees" },
  { icon: <ChecklistRtl />, label: "Задачи", value: "tasks" },
  { icon: <Event />, label: "Календарь", value: "calendar" },
  { icon: <Dashboard />, label: "CRM", value: "crm" },
  { icon: <Topic />, label: "Документооборот", value: "workflow" },
  { icon: <ReduceCapacity />, label: "Управление персоналом", value: "hr" },
  { icon: <StickyNote2 />, label: "Нормотворчество", value: "legislation" },
  {
    icon: <InsertChartOutlined />,
    label: "Аналитика и отчеты",
    value: "analytics",
  },
  {
    icon: <Workspaces />,
    label: "Администрирование",
    value: "administration",
  },
  knowledgeNavbarItem,
  { icon: <AccountBalance />, label: "Музей", value: "museum" },
  { icon: <LocalLibrary />, label: "Библиотека", value: "library" },
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
  id: "_authed",
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
  authedRoute.addChildren([dashboardRoute, knowledgeRoute]),
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
