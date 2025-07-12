import { Header } from "@/features/header";
import { AppShell, Burger, Box, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "@/features/navbar";
import type { NavbarItem } from "@/features/navbar";

type Props = {
  items: NavbarItem[];
};

export function Layout({ items }: Props) {
  const [opened, { toggle, open }] = useDisclosure(false);
  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: { base: opened ? 275 : 56 },
        breakpoint: "sm",
      }}
      aside={{
        width: 66,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
      bg="primary.9"
    >
      <AppShell.Header bg="primary.9">
        <Header>
          <Burger opened={opened} onClick={toggle} size="sm" color="white" />
        </Header>
      </AppShell.Header>
      <AppShell.Navbar bg="primary.9" px={8}>
        <AppShell.Section grow component={ScrollArea} scrollbarSize={6}>
          <Navbar opened={opened} open={open} items={items} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Aside bg="primary.9"></AppShell.Aside>
      <AppShell.Main>
        <Box
          bg="grey1.0"
          style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
        >
          <ScrollArea h="calc(100vh - 80px)" type="scroll">
            <Box px={24} py={32}>
              <Outlet />
            </Box>
          </ScrollArea>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
