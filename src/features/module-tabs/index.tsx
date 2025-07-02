import { Tabs, Menu, ActionIcon } from "@mantine/core";
import { useRef, useState, useEffect } from "react";
import ChevronIcon from "@/shared/icons/chevron.svg";
import { useElementSize } from "@mantine/hooks";
import { useNavigate, useRouterState } from "@tanstack/react-router";

type TabItem = {
  label: string;
  value: string;
};

type Props = {
  items: TabItem[];
};

export const ModuleTabs = ({ items }: Props) => {
  const { ref, width } = useElementSize();
  const overflowBtnRef = useRef<HTMLButtonElement | null>(null);

  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  const [hiddenValues, setHiddenValues] = useState<string[]>([]);

  useEffect(() => {
    calculateVisibility();
  }, [items, width]);

  const calculateVisibility = () => {
    if (!width || !ref.current) return;

    const children = Array.from(ref.current.children) as HTMLElement[];

    const arrowWidth = 28;
    let usedWidth = 0;
    const nextHiddenValues: string[] = [];

    items.forEach((item, index) => {
      const el = children[index] as HTMLElement | undefined;
      if (!el) return;

      if (usedWidth + el.offsetWidth + arrowWidth <= width) {
        usedWidth += el.offsetWidth;
      } else {
        nextHiddenValues.push(item.value);
      }
    });

    setHiddenValues(nextHiddenValues);
  };

  return (
    <Tabs
      variant="navbar"
      value={location.pathname}
      onChange={(val) => val && navigate({ to: val })}
    >
      <Tabs.List ref={ref}>
        {items.map((item) => (
          <Tabs.Tab
            key={item.value}
            value={item.value}
            data-hidden={hiddenValues.includes(item.value) || undefined}
          >
            {item.label}
          </Tabs.Tab>
        ))}
        {hiddenValues.length > 0 && (
          <Menu withinPortal position="bottom-end">
            <Menu.Target>
              <ActionIcon
                variant="transparent"
                ref={overflowBtnRef}
                style={{ flex: "0 0 auto" }}
                aria-label="More tabs"
              >
                <ChevronIcon />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {items
                .filter((itm) => hiddenValues.includes(itm.value))
                .map((item) => (
                  <Menu.Item
                    key={item.value}
                    onClick={() => navigate({ to: item.value })}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
            </Menu.Dropdown>
          </Menu>
        )}
      </Tabs.List>
    </Tabs>
  );
};
