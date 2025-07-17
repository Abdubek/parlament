import { Title, Skeleton } from "@mantine/core";
import { useSectionParams } from "../hooks/use-section-params";
import { useSessionsBreadcrumbResolver } from "../resolver";
import { useEffect, useState } from "react";

export const SessionTitle = () => {
  const { lastSectionId } = useSectionParams();
  const breadcrumbResolver = useSessionsBreadcrumbResolver();
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (lastSectionId) {
      breadcrumbResolver(lastSectionId, 0).then((entry) => {
        setLabel(entry.label);
      });
    } else {
      setLabel("");
    }
  }, [lastSectionId, breadcrumbResolver]);

  if (label === "") {
    return <Skeleton height={46} width={600} />;
  }

  return <Title order={1}>{label}</Title>;
};
