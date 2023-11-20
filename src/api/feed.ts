import { SERVER_URL } from "./globals";
import { shuffle } from "./utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useFeed(
  username?: string,
  inputValue?: string,
  type?: "created" | "saved",
) {
  console.log("username 은? ", username);
  console.log("feed안에 type은? ", type);
  console.log("inputValue: ", inputValue);

  let fetchIdsUrl = SERVER_URL;

  if (!username) {
    if (inputValue && inputValue !== "") {
      fetchIdsUrl +=
        "/pins/search/findPinIdsByTitleOrTagName?searchName=" + inputValue;
    } else {
      fetchIdsUrl += "/pins/search/findAllIds";
    }
  } else {
    if (type === "created") {
      fetchIdsUrl += "/pins/search/findIdsByMemberId?id=" + username;
    } else if (type === "saved") {
      fetchIdsUrl += "/saves/search/findSavedPinIdsByMemberId?id=" + username;
    }
  }
  console.log("fetchIdsUrl: ", fetchIdsUrl);

  const { data: pinIds } = useQuery({
    queryKey: ["pinIds", fetchIdsUrl],
    queryFn: () =>
      fetch(fetchIdsUrl)
        .then((res) => res.json() as Promise<number[]>)
        .then((data) => shuffle(data)),
    staleTime: Infinity,
  });

  const fetchOne = async (id?: number) => {
    if (id === undefined) return undefined;
    const pinRes = await fetch(
      `${SERVER_URL}/pins/${id}?projection=pinProjection`,
    );
    if (!pinRes.ok) throw new Error("No data");
    const pinData = (await pinRes.json()) as { image: { imgSeq: number } };
    const imgSeq = pinData.image.imgSeq;
    const res = await fetch(`${SERVER_URL}/upImages/${imgSeq}/content`);
    if (!res.ok) throw new Error("No data");
    const data = await res.blob();
    return URL.createObjectURL(data);
  };

  return useInfiniteQuery({
    queryKey: ["feed", pinIds],
    queryFn: ({ pageParam }) => fetchOne(pageParam),
    initialPageParam: pinIds ? pinIds[0] : undefined,
    getNextPageParam: (_0, _1, lastPageParam) => {
      if (pinIds === undefined) return undefined;
      if (lastPageParam === undefined) return undefined;
      return pinIds[pinIds.indexOf(lastPageParam) + 1];
    },
    enabled: !!pinIds,
    staleTime: Infinity,
  });
}
