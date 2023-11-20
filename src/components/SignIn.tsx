import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import type { TypographyProps } from "@mui/material/Typography";
import { useUser } from "../api/user";
import { SERVER_URL } from "../api/globals";

function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pinterest.com/">
        PinterestClone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [, setUser] = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      id: data.get("id") as string,
      pwd: data.get("pwd") as string,
    };
    const response = await fetch(
      `${SERVER_URL}/members/search/existsByIdAndPwd?${new URLSearchParams(
        params,
      ).toString()}`,
      { method: "GET" },
    );
    const json = (await response.json()) as boolean | null;
    if (json === true) {
      const user = {
        id: params.id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      alert(`환영합니다. ${user.id}님!`);
      location.href = "/feed";
    } else {
      alert("아이디 혹은 비밀번호를 확인해 주세요.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box
          component="form"
          onSubmit={(event) => {
            handleSubmit(event).catch((err) => {
              console.log(err);
              alert("ajax error");
            });
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="id"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="pwd"
            label="비밀번호"
            type="password"
            id="pwd"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Grid container justifyContent="flex-end">
            {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                계정이 없으신가요? 회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
