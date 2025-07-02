import { authedRoute } from "@/app/main";
import { createRoute } from "@tanstack/react-router";
import InsertChartOutlined from "@/shared/icons/insert_chart_outlined.svg?react";
import type { NavbarItem } from "@/features/navbar";

export const analyticsRoute = createRoute({
  getParentRoute: () => authedRoute,
  path: "/cabinet/analytics",
  component: () => <div>Аналитика и отчеты</div>,
});

export const analyticsNavbarItem: NavbarItem = {
  icon: <InsertChartOutlined />,
  label: "Аналитика и отчеты",
  value: "/cabinet/analytics",
};
