import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ProfileAvatar from "./ProfileAvatar";
import FollowButton from "./FollowButton";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../api/globals";

type FollowerListDialogProps = DialogProps & {
  open: boolean;
  username: string;
  onClose: () => void;
};

export default function FollowerListDialog({
  username,
  open,
  onClose,
  ...props
}: FollowerListDialogProps) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      `${SERVER_URL}/follows/search/findIdFollowIdsByIdFollowerId?follower=${username}`,
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json() as Promise<string[]>;
        }
      })
      .then((data) => {
        if (data) {
          setIds(data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="xs"
      {...props}
    >
      <DialogTitle textAlign="center">
        {ids.length > 0 ? `팔로워 ${ids.length}명` : "팔로워가 없습니다."}
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {ids.map((id) => (
          <ListItem disableGutters key={id}>
            <ListItemButton href={`/user/${id}`} onClick={onClose}>
              <ListItemAvatar>
                <ProfileAvatar username={id}>
                  <PersonIcon />
                </ProfileAvatar>
              </ListItemAvatar>
              <ListItemText primary={id} />
              <FollowButton target={id} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
