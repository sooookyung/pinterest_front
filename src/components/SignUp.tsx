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
import { ThemeProvider } from "@mui/material/styles";
import type { TypographyProps } from "@mui/material/Typography";
import theme from "../api/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { User } from "../api/user";
import { SERVER_URL } from "../api/globals";
import { useState } from "react";

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

type SignUpUser = { pwd: string } & NonNullable<User>;

export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const signUpUser: SignUpUser = {
      id: data.get("id") as string,
      pwd: data.get("pwd") as string,
      name: data.get("name") as string,
      birth: data.get("birth") as string,
    };
    if (!signUpUser.id || !signUpUser.pwd) {
      return;
    }
    const json = JSON.stringify(signUpUser);
    console.log(json);

    fetch(SERVER_URL + "/members", {
      body: json,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          alert("회원가입이 완료 되었습니다.");
          location.href = "/signin";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [idHelperText, setIdHelperText] = useState("아이디를 입력해주세요.");
  const [pwdHelperText, setPwdHelperText] =
    useState("비밀번호를 입력해주세요.");

  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const id = e.target.value;
    if (!id) {
      setIdHelperText("아이디를 입력해주세요.");
      return;
    }
    fetch(SERVER_URL + "/members/" + id)
      .then((response) => {
        if (response.ok) {
          setIdHelperText("이미 존재하는 아이디 입니다.");
        } else {
          setIdHelperText("");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handlePwdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const pwd = e.target.value;
    if (!pwd) {
      setPwdHelperText("비밀번호를 입력해주세요.");
      return;
    }
    setPwdHelperText("");
  }

  return (
    <ThemeProvider theme={theme}>
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
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={idHelperText !== ""}
                  helperText={idHelperText}
                  required
                  fullWidth
                  id="id"
                  label="아이디"
                  name="id"
                  autoComplete="id"
                  onChange={handleIdChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={pwdHelperText !== ""}
                  helperText={pwdHelperText}
                  required
                  fullWidth
                  name="pwd"
                  label="비밀번호"
                  type="password"
                  id="pwd"
                  autoComplete="new-password"
                  onChange={handlePwdChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="name" label="이름" id="name" />
              </Grid>
              <Grid item xs={12}>
                {/* <TextField
                  required
                  fullWidth
                  name="birth"
                  label="생년월일"
                  id="birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> */}
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ko"
                >
                  <DatePicker
                    format="YYYY-MM-DD"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        id: "birth",
                        name: "birth",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraids" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via id."
                />
              </Grid> */}
            </Grid>
            <Button
              disabled={!!idHelperText || !!pwdHelperText}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  이미 아이디가 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
