import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import PinNavBar from "./PinNavBar";
import ProfileFooter from "./ProfileFooter";
import EditProfilePage from "./EditProfilePage";
import AccountSetting from "./AccountSetting";
import ProfileVisibility from "./ProfileVisibility";
import ProfileSecurity from "./ProfileSecurity";
import ProfileAuthority from "./ProfileAuthority";
import ProfileFeed from "./ProfileFeed";
import ProfileNotificationSettings from "./ProfileNotificationSettings";
import ProfileOwnership from "./ProfileOwnership";
import ProfileData from "./ProfileData";
import ProfileBContents from "./ProfileBContents";
import { useEffect, useRef, useState } from "react";
import { updateUser, useServerUser } from "../api/user";
import { getImage } from "../api/image";

export default function ProfileTab() {
  const result = useServerUser();
  const data = result.data;

  const [selectedIndex, setSelectedIndex] = React.useState(2);
  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>("");
  const [pwd, setPwd] = useState<string>(""); //값을 수정할 수 있게 할때
  const [birth, setBirth] = React.useState<string | null>(null);
  const [sex, setSex] = React.useState<string | null>(null);
  const [loc, setLoc] = React.useState<string | null>(null);
  const email = data?.id + "@pinterest.clone";

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (!data) {
      return;
    }
    setBirth(data.birth ?? null);
    setSex(data.sex ?? null);
    setLoc(data.loc ?? null);
    setName(data.name ?? "");
    if (data.upimage) {
      getImage(data.upimage.imgSeq)
        .then((img) => {
          setImgFile(URL.createObjectURL(img));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [data]);

  const doSave = () => {
    updateUser(data?.id, { name, birth, sex, loc })
      .then((res) => {
        if (res.ok) {
          alert("저장되었습니다.");
        } else {
          alert("저장에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
        overflowX: "hidden",
      }}
    >
      <PinNavBar />
      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{ marginTop: 16 }}
      ></List>
      <Divider sx={{ borderBottomWidth: "inherit" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <List
          component="nav"
          aria-label="secondary mailbox folder"
          sx={{ width: "400px", paddingRight: "100px", paddingBottom: "397px" }}
        >
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <Typography fontWeight="bold">프로필 수정</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <Typography fontWeight="bold">계정 관리</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <Typography fontWeight="bold">프로필 가시성</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 6}
            onClick={(event) => handleListItemClick(event, 6)}
          >
            <Typography fontWeight="bold">소유권이 표시된 계정</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 7}
            onClick={(event) => handleListItemClick(event, 7)}
          >
            <Typography fontWeight="bold">소셜 권한</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 8}
            onClick={(event) => handleListItemClick(event, 8)}
          >
            <Typography fontWeight="bold">알림</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 9}
            onClick={(event) => handleListItemClick(event, 9)}
          >
            <Typography fontWeight="bold">개인정보 및 데이터</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 10}
            onClick={(event) => handleListItemClick(event, 10)}
          >
            <Typography fontWeight="bold">보안</Typography>
          </ListItemButton>

          <ListItemButton
            selected={selectedIndex === 11}
            onClick={(event) => handleListItemClick(event, 11)}
          >
            <Typography fontWeight="bold">브랜드 컨텐츠</Typography>
          </ListItemButton>
        </List>

        {selectedIndex === 2 && (
          <EditProfilePage
            vars={{ data, imgFile, setImgFile, imgRef, name, setName }}
          />
        )}
        {selectedIndex === 3 && (
          <AccountSetting
            vars={{
              pwd,
              setPwd,
              birth,
              setBirth,
              sex,
              setSex,
              loc,
              setLoc,
              email,
            }}
          />
        )}
        {selectedIndex === 4 && <ProfileVisibility />}
        {selectedIndex === 10 && <ProfileSecurity />}
        {selectedIndex === 7 && <ProfileAuthority />}
        {selectedIndex === 5 && <ProfileFeed />}
        {selectedIndex === 8 && <ProfileNotificationSettings />}
        {selectedIndex === 6 && <ProfileOwnership />}
        {selectedIndex === 9 && <ProfileData />}
        {selectedIndex === 11 && <ProfileBContents />}
      </div>
      <ProfileFooter onSave={doSave} />
    </Box>
  );
}
