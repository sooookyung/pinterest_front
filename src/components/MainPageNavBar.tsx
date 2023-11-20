import { AppBar, Box, Button, Toolbar } from "@mui/material";
import PinterestIcon from "@mui/icons-material/Pinterest";
import pinterest from "/imggg/pinterest.png";
export default function FirstMainPage() {
  return (
    <Box sx={{ flexGrow: 10, zIndex: 1 }}>
      <AppBar sx={{ backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          <Button
            color="secondary"
            sx={{ fontSize: 20, textTransform: "none" }}
            href="/"
          >
            <PinterestIcon
              sx={{ fontSize: 45, marginRight: 1, color: "red" }}
            />
            <img src={pinterest} style={{ width: 100, marginTop: 10 }}></img>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              size="large"
              aria-label="로그인"
              color="inherit"
              style={{
                marginLeft: 16,
                fontWeight: 3,
                backgroundColor: "red",
                borderRadius: 24,
                marginTop: 10,
                scrollBehavior: "smooth",
              }}
            >
              <span style={{ fontWeight: "bold" }}>팀원 소개</span>
            </Button>
            <Button
              size="large"
              aria-label="로그인"
              color="inherit"
              style={{
                marginLeft: 16,
                fontWeight: 50,
                backgroundColor: "red",
                borderRadius: 24,
                marginTop: 10,
              }}
              href="/signin"
            >
              <span style={{ fontWeight: "bold" }}>로그인</span>
            </Button>
            <Button
              size="large"
              aria-label="회원가입"
              color="inherit"
              style={{
                marginLeft: 16,
                fontWeight: 3,
                backgroundColor: "lightgrey",
                borderRadius: 24,
                marginTop: 10,
              }}
              href="/signup"
            >
              <span style={{ fontWeight: "bold", color: "black" }}>
                회원가입
              </span>
            </Button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
