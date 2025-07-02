import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";

export const dashboardRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "cabinet",
  component: () => <div>Dashboard</div>,
});
