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
  component: Layout,
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
  authedRoute.addChildren([dashboardRoute]),
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
