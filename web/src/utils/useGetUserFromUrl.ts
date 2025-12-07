import { useRouter } from "next/router";
import { useReadAgentByIdQuery } from "../gen/graphql";

export function useGetUserFromUrl() {
  const router = useRouter();
  const userId = router.query.id!.toString();

  return useReadAgentByIdQuery({
    variables: {
      id: userId,
    },
  })[0];
}
