import {
  AppShell as MantineAppShell,
  Burger,
  Box,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { Header } from "@/features/header";

export const AppShell = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineAppShell
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
      <MantineAppShell.Header bg="primary.9">
        <Header>
          <Burger opened={opened} onClick={toggle} size="sm" color="white" />
        </Header>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar bg="primary.9"></MantineAppShell.Navbar>

      <MantineAppShell.Aside bg="primary.9"></MantineAppShell.Aside>

      <MantineAppShell.Main>
        <Box
          bg="white"
          style={{ borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}
        >
          <ScrollArea h="calc(100vh - 80px)" type="scroll">
            <Outlet />
          </ScrollArea>
        </Box>
      </MantineAppShell.Main>
    </MantineAppShell>
  );
};
