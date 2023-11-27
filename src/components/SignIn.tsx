//Material-UI라이브러리에서 제공하는 컴포넌트 가져오기
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
  //저작권정보표시
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

/*SignIn 함수형 컴포넌트 시작됨. useUser 훅을 사용하여 사용자 정보를 관리하는데 필요한 상태 및 함수를 가져옴(재사용성)
여러 컴포넌트에서 사용자 정보를 추적해야 할 때마다 useUser를 호출하여 해당 상태와 함수를 가져와 사용할 수 있음*/
export default function SignIn() {
  //로그인 컴포넌트
  const [, setUser] = useUser();

  //폼제출 핸들러 함수 : 입력된 데이터를 수집하여 API로 전송하고, 그에 따른 응답을 처리
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*데이터 수집 및 API호출:
    폼 데이터를 수집하고, 해당 데이터를 이용하여 API로 요청을 보내고, 그에 대한 응답을 받아옴*/
    const data = new FormData(event.currentTarget); //현재 이벤트가 발생한 폼의 데이터를 수집
    const params = {
      //수집한 폼 데이터에서 필요한 정보(id, pwd)를 추출하여 param객체에 담는다
      id: data.get("id") as string, //해당값이 문자열임
      pwd: data.get("pwd") as string,
    };
    const response = await fetch(
      //추출한 id, pwd를 이용하여 API로 GET요청 보냄
      `${SERVER_URL}/members/search/existsByIdAndPwd?${new URLSearchParams(
        params,
      ).toString()}`,
      { method: "GET" },
    );

    //응답처리
    const json = (await response.json()) as boolean | null;
    if (json === true) {
      //서버응답이true인경우 그러니까 id와 pwd가 일치하는 경우에 실행되는 블록
      const user = {
        id: params.id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      alert(`환영합니다. ${user.id}님!`); //로그인됐을때
      location.href = "/feed";
    } else {
      alert("아이디 혹은 비밀번호를 확인해 주세요.");
    }
  };

  //컴포넌트반환
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
