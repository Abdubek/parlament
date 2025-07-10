import { createRoute } from "@tanstack/react-router";
import { documentsRoute } from "../index.tsx";
import { SessionsPage } from "./page.tsx";

export const sessionsRoute = createRoute({
  getParentRoute: () => documentsRoute,
  path: "/sessions/$",
  component: () => <SessionsPage />,
  loader: ({ params }) => {
    const segments =
      (params as { _splat?: string })._splat?.split("/").filter(Boolean) ?? [];

    const crumb = segments.length
      ? decodeURIComponent(segments[segments.length - 1])
      : "Отырыс (Заседания)";

    return { crumb };
  },
});
