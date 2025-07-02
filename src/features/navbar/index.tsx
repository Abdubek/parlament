import { Accordion, NavLink } from "@mantine/core";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export type NavbarItem = {
  icon?: ReactNode;
  label: string;
  value: string;
  children?: NavbarItem[];
};

type Props = {
  items: NavbarItem[];
  opened: boolean;
  open: () => void;
};

export const Navbar = ({ opened, open, items }: Props) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const matchRoute = useMatchRoute();

  useEffect(() => {
    if (!opened) {
      setActiveItem(null);
      return;
    }

    for (const item of items) {
      const isRouteMatch = matchRoute({ to: item.value, fuzzy: true });
      if (isRouteMatch) {
        setActiveItem(item.value);
        return;
      }
    }
  }, [opened, items, matchRoute]);

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
          <Accordion.Panel>
            {item.children?.map((child) => {
              const isActive = matchRoute({ to: child.value });
              return (
                <NavLink
                  key={child.value}
                  label={child.label}
                  href={child.value}
                  component={Link}
                  active={!!isActive}
                />
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};
