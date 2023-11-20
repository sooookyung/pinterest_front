import Button, { type ButtonProps } from "@mui/material/Button";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../api/globals";
import { useUser } from "../api/user";

type FollowButtonProps = ButtonProps & {
  target: string;
  followerCount?: number;
  setFollowerCount?: (count: number) => void;
};

export default function FollowButton({
  target,
  followerCount,
  setFollowerCount,
  ...props
}: FollowButtonProps) {
  const [self] = useUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    if (!self || !target) {
      return;
    }

    fetch(`${SERVER_URL}/follows/${self.id}_${target}`)
      .then((res) => {
        if (res.status === 200) {
          setIsFollowing(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [self, target]);

  function doFollow() {
    if (!self || !target) {
      return;
    }
    fetch(`${SERVER_URL}/follows`, {
      method: "POST",
      body: JSON.stringify({
        id: {
          follow: `/members/${self.id}`,
          follower: `/members/${target}`,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          setIsFollowing(true);
          if (followerCount && setFollowerCount) {
            setFollowerCount(followerCount + 1);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function doUnfollow() {
    if (!self || !target) {
      return;
    }
    fetch(`${SERVER_URL}/follows/${self.id}_${target}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          setIsFollowing(false);
          if (followerCount && setFollowerCount) {
            setFollowerCount(followerCount - 1);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return isFollowing ? (
    <Button variant="contained" onClick={doUnfollow} {...props}>
      팔로잉
    </Button>
  ) : (
    <Button variant="contained" color="success" onClick={doFollow} {...props}>
      팔로우
    </Button>
  );
}
