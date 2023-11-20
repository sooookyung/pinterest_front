import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar, { type AppBarOwnProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu, { MenuProps } from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Pinterest from "@mui/icons-material/Pinterest";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useUser } from "../api/user";
import { useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import PersonIcon from "@mui/icons-material/Person";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100ch",
    },
  },
}));

export default function PinNavBar({
  position,
}: {
  position?: AppBarOwnProps["position"];
}) {
  const [user] = useUser();
  const navigate = useNavigate();
  const goPin = () => {
    navigate("/feed");
  };
  const goHome = () => {
    navigate("/feed");
  };
  const goMakePin = () => {
    navigate("/makepin");
  };
  const goProfilePage = () => {
    navigate("/user/" + user?.id);
  };
  const goProfileTab = () => {
    navigate("/ProfileTab");
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [inputValue, setInputValue] = useState("");

  function pressEnterHandler(e: KeyboardEvent) {
    if (e.key === "Enter") {
      console.log("Enter key pressed. Input value:", inputValue);
      if (inputValue !== "") {
        navigate(`/pins/search/pinSearch/${inputValue}`);
        setInputValue("");
      }
    }
  }
  const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

  return (
    <Box sx={{ flexGrow: 10 }}>
      <AppBar position={position ?? "fixed"}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={goPin}
            //sx={{ mr: 1 }}
          >
            <Pinterest color="secondary" />
          </IconButton>
          <Button variant="text" color="secondary" onClick={goHome}>
            홈
          </Button>
          <Button
            variant="text"
            color="secondary"
            // endIcon={<KeyboardArrowDownIcon />}
            onClick={goMakePin}
          >
            만들기
          </Button>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={inputValue} // 입력 필드의 값을 상태로 설정
              onChange={(e) => setInputValue(e.target.value)} // 입력 필드 값이 변경될 때 상태 업데이트
              onKeyUp={(e) => pressEnterHandler(e)}
              type="search"
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <React.Fragment>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <ProfileAvatar
                    username={user?.id}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={goProfilePage}>
                  <PersonIcon style={{ marginRight: 12, color: "grey" }} />내
                  프로필
                </MenuItem>
                {/* <MenuItem onClick={goProfileTab}>
                  <Avatar /> 계정 관리
                </MenuItem> */}
                <Divider />
                <MenuItem onClick={goProfileTab}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  설정
                </MenuItem>
                <MenuItem component={Link} href="/logout">
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  로그아웃
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
