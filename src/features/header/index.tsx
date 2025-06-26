import { Avatar, Box, Flex, Select, Stack, Text, Title } from "@mantine/core";

type Props = {
  children: React.ReactNode;
};

export const Header = ({ children }: Props) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      h="100%"
      px={16}
      py={12}
      gap={16}
    >
      {children}
      <Logo />
      <Box flex={1}></Box>
      <Time />
      <SelectLanguage />
      <User />
    </Flex>
  );
};

const Logo = () => {
  return (
    <Stack gap={8} align="center" miw={200}>
      <img src="/logo.png" alt="logo" width={36} height={36} />
      <Text c="white" variant="caption" fw={600}>
        e-Parlament
      </Text>
    </Stack>
  );
};

const Time = () => {
  return (
    <Title c="white" order={1}>
      11:13
    </Title>
  );
};

const SelectLanguage = () => {
  return (
    <Select
      data={["RU", "KZ"]}
      defaultValue="RU"
      w={72}
      styles={{
        input: {
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "22px",
        },
      }}
    />
  );
};

const User = () => {
  return (
    <Flex h={46} p={4} bg="#ffffff33" bdrs={8} gap={12} align="center">
      <Avatar w={36} h={36} bg="white" />
      <Text variant="body" fw={600} c="white">
        Нурсултан Ермеков
      </Text>
    </Flex>
  );
};
