import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
// import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useUser } from "../api/user";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function ListItemLink({ href, text }: { href: string; text: string }) {
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (href.includes(":")) {
      href = href.replace(/:(\w+)/, (_, p1) => {
        return prompt(`${p1} 입력`) ?? "";
      });
    }
    navigate(href);
  }

  return (
    <ListItem disablePadding>
      <ListItemButton href={href} onClick={handleClick}>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export default function TestPage() {
  const [user] = useUser();
  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              테스트 페이지
            </Typography>
            <Button color="inherit" href={user ? "/logout" : "/signin"}>
              {user ? "로그아웃" : "로그인"}
            </Button>
          </Toolbar>
        </AppBar>
        <nav>
          <List>
            <ListItemLink href="/feed" text="피드(핀 테스트)" />
            <ListItemLink href="/pin/:seq" text="핀 정보(핀빌더)" />
            <ListItemLink href="/signin" text="로그인" />
            <ListItemLink href="/signup" text="회원가입" />
            <ListItemLink href="/user/:id" text="프로필" />
            <ListItemLink href="/profiletab" text="프로필수정(프로필탭)" />
            <ListItemLink href="/makepin" text="핀만들기" />
            <ListItemLink href="/" text="메인페이지" />
            <ListItemLink href="/test" text="테스트페이지" />
            <ListItemLink href="/clock" text="시계 테스트" />
            <ListItemLink href="/button" text="버튼 테스트" />
            <ListItemLink href="/image" text="이미지 테스트" />
            <ListItemLink href="/omok" text="오목판 테스트" />
          </List>
        </nav>
      </Box>
    </Container>
  );
}
