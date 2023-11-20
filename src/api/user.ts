import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import { SERVER_URL } from "./globals";

export type User = {
  id: string;
  name?: string | null;
  birth?: string | null;
  loc?: string | null;
  sex?: "Male" | "Female" | "Other" | null;
  upimage?: {
    imgSeq: number;
    contentId: string;
    contentLength: number;
    contentMimeType: string;
  } | null;
} | null;

export const UserContext = createContext<User>(null);
export const SetUserContext = createContext<
  Dispatch<SetStateAction<User>> | undefined
>(undefined);

export function useUser(): [User, Dispatch<SetStateAction<User>>] {
  const user = useContext(UserContext);
  const setUser = useContext(SetUserContext);
  if (!setUser) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return [user, setUser];
}

/**
 * React Query를 이용하여 아이디로 서버에서 유저 정보를 가져옵니다.
 * 아이디가 없으면 현재 로그인한 유저의 정보를 가져옵니다.
 * @param id 유저 아이디
 * @returns 유저 정보
 */
export function useServerUser(id?: string) {
  const [user] = useUser();
  if (!id) {
    if (!user) throw new Error("id must be provided if user is not logged in");
    id = user.id;
  }

  const result = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      fetch(`${SERVER_URL}/members/${id}?projection=memberProjection`).then(
        (res) => res.json() as Promise<User>,
      ),
  });
  return result;
}

export async function updateUser(
  id: string | undefined,
  info: Omit<User, "id">,
) {
  if (!id) {
    return Promise.reject("id must be provided");
  }
  return fetch(`${SERVER_URL}/members/${id}`, {
    method: "PATCH",
    body: JSON.stringify(info),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getFollowerCount(id: string) {
  const res = await fetch(
    `${SERVER_URL}/follows/search/countByIdFollowerId?follower=${id}`,
  );
  if (!res.ok) throw new Error("No data");
  const data = (await res.json()) as number;
  return data;
}
