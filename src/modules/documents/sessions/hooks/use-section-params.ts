import { sessionsRoute } from "..";

export const useSectionParams = () => {
  const { _splat } = sessionsRoute.useParams() as { _splat?: string };
  const splat: string | undefined = _splat;
  const params = splat?.split("/");
  const lastSectionId = params?.[params.length - 1];

  return { lastSectionId, params, level: params?.length ?? 0 };
};
