import { Accordion } from "@mantine/core";
import { useEffect, useState } from "react";
import AccountBalance from "@/shared/icons/account_balance.svg?react";
import ChecklistRtl from "@/shared/icons/checklist_rtl.svg?react";
import Dashboard from "@/shared/icons/dashboard.svg?react";
import Event from "@/shared/icons/event.svg?react";
import InsertChartOutlined from "@/shared/icons/insert_chart_outlined.svg?react";
import Inventory2 from "@/shared/icons/inventory_2.svg?react";
import LocalLibrary from "@/shared/icons/local_library.svg?react";
import Notifications from "@/shared/icons/notifications.svg?react";
import PeopleOutline from "@/shared/icons/people_outline.svg?react";
import ReduceCapacity from "@/shared/icons/reduce_capacity.svg?react";
import StickyNote2 from "@/shared/icons/sticky_note_2.svg?react";
import Topic from "@/shared/icons/topic.svg?react";
import Workspaces from "@/shared/icons/workspaces.svg?react";

const items = [
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
  {
    icon: <Inventory2 />,
    label: "База знаний",
    value: "knowledge-base",
  },
  { icon: <AccountBalance />, label: "Музей", value: "museum" },
  { icon: <LocalLibrary />, label: "Библиотека", value: "library" },
] as const;

type Props = {
  opened: boolean;
  open: () => void;
};

export const Navbar = ({ opened, open }: Props) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  useEffect(() => {
    if (!opened) {
      setActiveItem(null);
    }
  }, [opened]);

  const handleChange = (value: string | null) => {
    setActiveItem(value);
    open();
  };

  return (
    <Accordion
      variant="navbar"
      data-opened={opened}
      value={activeItem}
      onChange={handleChange}
    >
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.Control icon={item.icon}>{item.label}</Accordion.Control>
          <Accordion.Panel />
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
