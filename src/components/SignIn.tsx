//로그인페이지

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
      `${SERVER_URL}/members/search/existsByIdAndPwd?${new URLSearchParams(
        params,
      ).toString()}`,
      { method: "GET" }, //여기서 GET요청은 아이디랑 패스워드를 서버에 전송하여 해당 아이디와 패스워드가 일치하는지 확인하는 용도
    );
    /*추출한 id, pwd를 이용하여 API로 GET요청 보냄.
    fetch함수를 사용하여 서버에 요청을 보냄.
    ${SERVER_URL}/members/search/existsByIdAndPwd?이부분은 id와pwd를 입력했을때 그 정보들이 있는지 확인하는 페이지(백엔드쪽)
    new URLSearchParams(params,).toString()}`는 쿼리문자열 생성함.
    쿼리문자열은 url에 파라미터를 전달하는 방식중 하나로
    서버에 데이터를 전달하기 위해서 사용됨
    awit는 비동기 처리를 위해 사용되며 서버로부터의 응답을 기다리게함 
    비동기처리:프로그램이 어떤 작업을 실행하는 동안 작업이 완료될 때까지 기다리지 않고 다른 작업을 동시에 수행할 수 있는것*/

    //응답처리
    const json = (await response.json()) as boolean | null;
    //await response.json()은 서버로부터 텍스트형태로 온 응답을  자바스크립트 객체로 변환함. 비동기로 수행됨
    //그리고 서버로부터 받은 JSON데이터는 json변수에 할당됨
    //네트워트 요청이 완료되기 전까지 서버응답 데이터가 없을 수 있기 때문에 Promise를 반환한다.
    if (json === true) {
      //서버에서 받아온 JSON데이터가 true인지 체크(id, pwd가 일치하는 경우)
      const user = {
        id: params.id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      //일치하면 새로운 객체user생성, 로컬스토리지에 저장, setUser함수를 통해 사용자 정보를 업데이트함
      alert(`환영합니다. ${user.id}님!`); //로그인됐을때
      location.href = "/feed";
      //메세지 띄우고location.href = "/feed";를 통해 로그인 후의 페이지로 이동함
    } else {
      //id, pwd가 일치하지 않는 경우
      alert("아이디 혹은 비밀번호를 확인해 주세요.");
    }
  }; //서버응답이true인경우 그러니까 id와 pwd가 일치하는 경우에 실행되는 블록

  
  //컴포넌트 반환: 컴포넌트가 화면에 나타날 내용을 React에 의해 실제 웹 페이지에 보임. 즉 return부분은 사용자에게 보이는 화면을 만들어내는 역할을 함
  return (  
    <Container component="main" maxWidth="xs"> {/*MUI에서 제공하는거. 페이지의 전체적인 레이아웃 설정*/}
      <Box      {/*box는 컴포넌트로 페이지 상단에 로그인 관련 UI를 보여주는 컨테이너.*/}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column", //세로방향으로 요소들 배열
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}> {/*Avatar는 컴포넌트로 프로필 사진을 나타냄. m은 margin조절, bg-는 배경색 지정함*/}
          <LockOutlinedIcon />   {/*자물쇠아이콘 나타내는 MUI아이콘 컴포넌트*/}
        </Avatar>
        <Typography component="h1" variant="h5"> {/*Typography:제목나타내는 컴포넌트 */}
          로그인
        </Typography>
        <Box   {/* 로그인 폼 */}
          component="form"
          onSubmit={(event) => { //폼제출시 handleSubmit함수 호출, 오류발생시 에러 출력하고 알림띄움
            handleSubmit(event).catch((err) => {
              console.log(err);
              alert("ajax error");
            });
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField  {/* 아이디 입력 필드 -사용자로부터 id입력받는 필드 */}
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="id"
            autoFocus
          />
          <TextField    {/* 비밀번호 입력 필드 */}
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
          <Button     {/* 로그인 시도하는 버튼 컴포넌트 -클릭시 폼 제출됨 */}
            type="submit" {/*버튼이 폼 제출에 사용되도록 지정함*/}
            fullWidth
            variant="contained" 
            sx={{ mt: 3, mb: 2 }} 
          >
            로그인
          </Button>     
          <Grid container justifyContent="flex-end">     {/* 회원가입하라고 표시되는 링크 */}
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
