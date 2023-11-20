import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useUser } from "../api/user";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../api/globals";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Profiletext() {
  const [user] = useUser();
  const userId = user?.id;
  const { seq: pinSeq } = useParams(); //pinsSeq 변수에 핀번호 할당

  interface Member {
    id: string;
    upimage: {
      imgSeq: number;
    };
  }
  interface Data {
    pinSeq: number;
    pinTitle: string;
    pinDesc: number;
    image: number;
    pinRdate: Date;
    pinWriter: string;
    comment: string;
    saves: number;
    tags: number;
    id: string;
    writer: {
      id: string;
    };
  }
  interface User {
    imgSeq: number;
    contentId: string;
  }
  const { data: userIdData } = useQuery<User>({
    queryKey: ["userId", userId],
    queryFn: () =>
      fetch(SERVER_URL + "/members/" + userId + "/ProfileImg").then((res) =>
        res.json(),
      ),
  });

  const { data: memberData } = useQuery<Member>({
    queryKey: ["members", pinSeq],
    queryFn: () =>
      fetch(SERVER_URL + "/pins/" + pinSeq + "/pinWriter").then((res) =>
        res.json(),
      ),
  });

  const { data: pinData } = useQuery<Data>({
    queryKey: ["pins", pinSeq],
    queryFn: () =>
      fetch(SERVER_URL + "/pins/" + pinSeq + "?projection=pinProjection").then(
        (res) => res.json(),
      ),
  });

  const getFollowerCount = () => {
    const data = fetch(
      `${SERVER_URL}/follows/search/countByIdFollowerId?follower=${pinData?.writer.id}`,
      {
        method: "GET",
      },
    );
    return data;
  };
  const [followerCount, setFollowerCount] = useState(0);
  useEffect(() => {
    if (!pinData?.writer) {
      return;
    }
    getFollowerCount()
      .then((res) => {
        return res.json();
      })
      .then((count) => {
        setFollowerCount(count);
      });
  }, [getFollowerCount, pinData]);

  return (
    <>
      <List>
        <ListItem sx={{ p: 0 }}>
          <ListItemAvatar>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={userId}
                src={`${SERVER_URL}/upImages/${userIdData?.imgSeq}/content`}
              />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={userId}
            secondary={`팔로우 ${followerCount}명`}
          />
        </ListItem>
      </List>
    </>
  );
}

export default Profiletext;
