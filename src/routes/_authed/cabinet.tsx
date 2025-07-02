import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/cabinet")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Feed page</div>;
}
