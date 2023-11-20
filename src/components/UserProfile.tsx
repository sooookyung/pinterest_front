import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PinNavBar from "./PinNavBar";
import Container from "@mui/material/Container";
import { getFollowerCount, useServerUser, useUser } from "../api/user";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PinLayout from "./Pinlayout";
import ProfileAvatar from "./ProfileAvatar";
import FollowButton from "./FollowButton";
import Link from "@mui/material/Link";
import FollowerListDialog from "./FollowerListDialog";

export default function UserProfile() {
  const { id } = useParams();
  const { data } = useServerUser(id);
  const [self] = useUser();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [followerCount, setFollowerCount] = useState<number>(-1);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const isSelf = self?.id === id;

  useEffect(() => {
    if (!id) {
      return;
    }
    getFollowerCount(id)
      .then((count) => {
        setFollowerCount(count);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [followerCount, id]);

  const handleFollowerCountClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    id && (
      <Box sx={{ flexGrow: 1 }}>
        <PinNavBar position="static" />
        <Container maxWidth="md" sx={{ padding: "1.5em" }}>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <ProfileAvatar username={id} sx={{ width: 120, height: 120 }} />
            </Grid>
            <Grid item>
              <Typography variant="h4">{data?.name ?? "이름없음"}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">@{id}</Typography>
            </Grid>
            <Grid item>
              <Link
                onClick={handleFollowerCountClick}
                color="inherit"
                underline="none"
              >
                <Typography variant="h6">팔로잉 {followerCount}명</Typography>
              </Link>
            </Grid>
            <Grid item container justifyContent="center">
              <Grid item display={isSelf ? "none" : "flex"}>
                <FollowButton
                  target={id}
                  followerCount={followerCount}
                  setFollowerCount={setFollowerCount}
                />
              </Grid>
              <Grid item display={isSelf ? "flex" : "none"}>
                <Button variant="outlined" href="/profiletab">
                  프로필 수정
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ paddingTop: "20px" }}>
              <Tabs
                value={selectedTab}
                onChange={(_, value) => {
                  setSelectedTab(value as number);
                  console.log(value);
                }}
              >
                <Tab label="생성됨" />
                <Tab label="저장됨" />
              </Tabs>
              {selectedTab === 0 && (
                <PinLayout username={id} type="created" hideNavBar />
              )}
              {selectedTab === 1 && (
                <PinLayout username={id} type="saved" hideNavBar />
              )}
            </Box>
          </Grid>
        </Container>
        {dialogOpen && (
          <FollowerListDialog
            username={id}
            open={dialogOpen}
            onClose={handleDialogClose}
          />
        )}
      </Box>
    )
  );
}
