import Avatar, { type AvatarProps } from "@mui/material/Avatar";
import { User, useServerUser, useUser } from "../api/user";
import { useEffect, useState } from "react";
import { getImage } from "../api/image";

type ProfileAvatarProps = AvatarProps & {
  username?: string;
};

export default function ProfileAvatar({
  username,
  ...props
}: ProfileAvatarProps) {
  const [self] = useUser();
  if (!username) {
    username = self?.id;
  }
  let data: User | undefined = undefined;
  try {
    const serverUser = useServerUser(username);
    data = serverUser.data;
  } catch (err) {
    data = null;
  }

  const [imgSrc, setImgSrc] = useState<string>("");
  useEffect(() => {
    if (!data) {
      setImgSrc("");
      return;
    }

    if (data.upimage) {
      getImage(data.upimage.imgSeq)
        .then((img) => {
          setImgSrc(URL.createObjectURL(img));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setImgSrc("");
    }
  }, [data]);

  return <Avatar src={imgSrc} {...props} />;
}
