import { createRoute } from "@tanstack/react-router";
import { documentsRoute } from "../index.tsx";
import { SessionsPage } from "./page.tsx";

export const sessionsRoute = createRoute({
  getParentRoute: () => documentsRoute,
  path: "/sessions/$",
  component: () => <SessionsPage />,
});
