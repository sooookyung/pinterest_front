/*라이브러리 및 컴포넌트 가져오기(import)
:필요한 MUI(Material-UI) 컴포넌트 및 라이브러리를 가져온다
MUI는 Material-UI 라이브러리에서 제공하는 UI 요소들을 의미한다
Material-UI는 React 애플리케이션을 위한 재사용 가능한
UI 컴포넌트를 제공하는 라이브러리 중 하나*/
import Avatar from "@mui/material/Avatar";
//Avatar: 사용자의 프로필 사진이나 아이콘을 나타내는데 사용되는 MUI 컴포넌트
import Button from "@mui/material/Button";
//Button: 버튼 엘리먼트를 만들기 위해 사용되는 MUI 컴포넌트
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
//Link: 하이퍼링크를 만들기 위해 사용되는 MUI 컴포넌트로, 사용자를 다른 페이지로 이동하게 할 수 있게함.
import Grid from "@mui/material/Grid";
//Grid: 그리드 시스템을 사용하여 페이지를 나누고 배치하는 데 사용되는 MUI 컴포넌트
import Box from "@mui/material/Box";
//Box: 여러 컴포넌트를 감싸거나 스타일을 적용하는데 사용되는 MUI 컴포넌트
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
//LockOutlinedIcon: 자물쇠 아이콘을 나타내는 MUI의 아이콘 컴포넌트
import Container from "@mui/material/Container";
//Container: 컨텐츠를 감싸고 중앙 정렬하는 데 사용되는 MUI 컴포넌트
import { ThemeProvider } from "@mui/material/styles";
//ThemeProvider: 애플리케이션에 테마를 적용하기 위해 사용되는 MUI의 컴포넌트
import type { TypographyProps } from "@mui/material/Typography";
//Typography: 텍스트 스타일을 지정하기 위해 사용되는 MUI 컴포넌트
import theme from "../api/theme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
/*AdapterDayjs, LocalizationProvider, DatePicker: Material-UI의 날짜 선택 기능을 구현하기 위한 
컴포넌트와 관련된 라이브러리 및 컴포넌트*/
import type { User } from "../api/user";
import { SERVER_URL } from "../api/globals";
/*User, SERVER_URL: 애플리케이션에서 사용되는 사용자 및 서버 URL과 같은 
상수 및 데이터 모델을 정의한 파일에서 가져온 것*/
import { useState } from "react";
/*useState, React: React에서 상태(state)를 관리하고 
컴포넌트를 작성하기 위한 React의 핵심 요소*/

//Copyright 함수: 페이지 하단에 표시될 MUI저작권 정보를 표시하기 위한 함수
function Copyright(props: TypographyProps) {
  //함수정의
  return (
    <Typography //텍스트 스타일 설정하는 MUI
      variant="body2"
      color="text.secondary"
      align="center" //정렬-가운데
      {...props} //부모 컴포넌트에 전달된 속성을 그대로 사용 할 수 있다.
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pinterest.com/">
        PinterestClone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
} //new Date() : 자바스크립트 Data객체

//SignUpUser함수정의 : 회원가입 페이지 구현하는 함수 컴포넌트 정의.
type SignUpUser = { pwd: string } & NonNullable<User>; //null, undefined가 아닌거
// pwd가 문자열타입이고, 값이 있는 'User'타입을 가지는 객체를 나타내는 'SignUpUser'
export default function SignUp() {
  //SignUp 함수형 컴포넌트를 정의하고 외부에서 재사용할 수 있도록 함
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //폼이 발생했을 때 실행되는 handleSubmit함수를 정의. 폼데이터 수집해서sighUpUser객체생성. 아래 회원가입 처리구현
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //폼 제출 이벤트 다룰 때 사용. 사용자가 폼에 입력힌 값을 담고 있는 객체
    const signUpUser: SignUpUser = {
      //사용자정보 가공하여 SignUpUser타입에 맞게 객체 생성. 폼 데이터에서 필요한 값을 가져와서 SignUpUser타입에 할당.
      id: data.get("id") as string,
      pwd: data.get("pwd") as string,
      name: data.get("name") as string,
      birth: data.get("birth") as string,
    };
    if (!signUpUser.id || !signUpUser.pwd) {
      //id,pwd 입력되있지 않으면 함수 실행 종료.
      return;
    }
    const json = JSON.stringify(signUpUser); //signUpUser객체를 JSON문자열로 변환하고, 결과 출력함.
    console.log(json);

    fetch(SERVER_URL + "/members", {
      //서버로 데이터를 전송하기 위해 fetch함수사용/서버로 POST요청 보냄
      body: json,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // mode: "no-cors",
    })
      .then((response) => {
        //서버의 응답 받아와서 처리함
        if (response.ok) {
          //성공하면 alert("")알림 뜨고 로그인 페이지로 이동
          alert("회원가입이 완료 되었습니다.");
          location.href = "/signin";
        }
      })
      .catch((err) => {
        //서버 요청 중에 발생한 오류 콘솔에 기록
        console.error(err);
      });
  };

  const [idHelperText, setIdHelperText] = useState("아이디를 입력해주세요.");
  const [pwdHelperText, setPwdHelperText] =
    useState("비밀번호를 입력해주세요.");

  /*아래 함수는 사용자가 아이디 입력할 때마다 해당 아이디가 사용중인지 
    서버에 확인하고 그 결과에 따라 화면에 메세지 표시함*/
  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    //아이디 입력이 변경될 때 호출되는 함수를 정의
    const id = e.target.value; //입력된 아이디 값을 id변수에 저장
    if (!id) {
      setIdHelperText("아이디를 입력해주세요.");
      return;
      //아이디가 비어있으면 문자보이고 함수 종료됨
    }
    fetch(SERVER_URL + "/members/" + id)
      //서버에 해당 아이디가 이미 존재하는지 확인하는 요청 보냄
      .then((response) => {
        if (response.ok) {
          setIdHelperText("이미 존재하는 아이디 입니다.");
        } else {
          setIdHelperText("");
        }
      }) //이미 존재하는 아이디이면 문자보임. 존재하지 않으면 빈 문자
      .catch((err) => {
        console.error(err); //서버 요청중에 에러 발생시 출력
      });
  }
  function handlePwdChange(e: React.ChangeEvent<HTMLInputElement>) {
    //비밀번호 입력이 변경될 때 호출되는 함수를 정의.
    const pwd = e.target.value; //입력된 비밀번호 값을 pwd변수에 저장
    if (!pwd) {
      //비밀번호가 비어있으면 아래있는 문자뜨고 함수 종료됨.
      setPwdHelperText("비밀번호를 입력해주세요.");
      return;
    }
    setPwdHelperText(""); //비밀번호가 비어있지 않으면 빈문자열
  }

  return (
    //ThemeProvider을 사용하여 자식 컴포넌트들에게 일관된 디자인을 제공하기 위해 사용됨
    <ThemeProvider theme={theme}>
      {" "}
      /
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
