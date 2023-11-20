import { useState } from "react";
import { useUser } from "../api/user";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function MainPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupId, setSignupId] = useState("");
  const [signupPwd, setSignupPwd] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupDate, setSignupDate] = useState("");

  const [loginId, setloginId] = useState("");
  const [loginPwd, setloginPwd] = useState("");

  const [, setUser] = useUser();

  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };
  const handleShowSignup = () => {
    setShowSignup(true);
  };

  function doLogin() {
    const params = {
      id: loginId,
      pwd: loginPwd,
    };
    fetch(
      `http://localhost:8080/members/search/existsByIdAndPwd?${new URLSearchParams(
        params,
      ).toString()}`,
      { method: "GET" },
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((json) => {
        if (json === true) {
          const user = {
            id: loginId,
            // TODO: get properties from server
            name: "test",
          };
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);

          alert(`환영합니다. ${loginId}님!`);
          location.href = "/feed";
        } else {
          alert("아이디 혹은 비밀번호를 확인해 주세요.");
        }
      })
      .catch((err) => {
        alert("아이디 혹은 비밀번호를 확인해 주세요.");
        console.error(err);
      });
  }

  function doSignup() {
    const requestBody = {
      id: signupId,
      pwd: signupPwd,
      name: signupName,
      birth: signupDate,
    };
    const json = JSON.stringify(requestBody);
    console.log(json);

    fetch("http://localhost:8080/members", {
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
          handleCloseSignup();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={handleShowLogin}
        style={{ backgroundColor: "#E60023", color: "white" }}
      >
        로그인
      </Button>

      <Button
        variant="outlined"
        onClick={handleShowSignup}
        sx={{
          m: 1,
          color: "black",
          borderColor: "gray",
          ":hover": { borderColor: "black" },
        }}
      >
        회원가입
      </Button>

      <Button
        href="/profile"
        variant="contained"
        style={{ backgroundColor: "#E60023", color: "white" }}
      >
        프로필
      </Button>

      <div>
        <Modal
          open={showLogin}
          onClose={handleCloseLogin}
          aria-labelledby="login-modal"
          aria-describedby="login-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="login-modal" style={{ textAlign: "center" }}>
              Pinterest에 오신것을
              <br />
              환영합니다!
            </h2>
            <TextField
              fullWidth
              label="ID"
              variant="outlined"
              margin="normal"
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
              autoFocus
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={loginPwd}
              onChange={(e) => setloginPwd(e.target.value)}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={doLogin}
                style={{ backgroundColor: "#E60023", color: "white" }}
              >
                로그인
              </Button>
            </div>
          </Box>
        </Modal>
      </div>

      <div>
        <Modal
          open={showSignup}
          onClose={handleCloseSignup}
          aria-labelledby="signup-modal"
          aria-describedby="signup-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="signup-modal" style={{ textAlign: "center" }}>
              Pinterest에 오신것을 <br />
              환영합니다!
            </h2>
            <TextField
              fullWidth
              label="아이디"
              variant="outlined"
              margin="normal"
              value={signupId}
              onChange={(e) => setSignupId(e.target.value)}
              autoFocus
            />
            <TextField
              fullWidth
              label="비밀번호"
              type="password"
              variant="outlined"
              margin="normal"
              value={signupPwd}
              onChange={(e) => setSignupPwd(e.target.value)}
            />
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              margin="normal"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <TextField
              fullWidth
              label="생년월일"
              InputLabelProps={{ shrink: true, required: true }} //기본값안뜨게추가
              type="date"
              variant="outlined"
              margin="normal"
              value={signupDate}
              onChange={(e) => setSignupDate(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={doSignup}
                style={{ backgroundColor: "#E60023", color: "white" }}
              >
                가입하기
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default MainPage;
