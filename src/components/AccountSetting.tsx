import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useServerUser } from "../api/user";
import { SERVER_URL } from "../api/globals";
import dayjs from "dayjs";

interface AccountSettingProps {
  vars: {
    pwd: string;
    setPwd: React.Dispatch<React.SetStateAction<string>>;
    birth: string | null;
    setBirth: React.Dispatch<React.SetStateAction<string | null>>;
    sex: string | null;
    setSex: React.Dispatch<React.SetStateAction<string | null>>;
    loc: string | null;
    setLoc: React.Dispatch<React.SetStateAction<string | null>>;
    email: string;
  };
}

export default function AccountSetting({
  vars: { pwd, setPwd, birth, setBirth, sex, setSex, loc, setLoc, email },
}: AccountSettingProps) {
  // const pwd = data ? data.pwd : ""; //값을 수정 안되게할때
  const { data } = useServerUser();

  const handleChange = (event: SelectChangeEvent) => {
    setLoc(event.target.value);
  };

  //비밀번호 변경
  const changePwd = () => {
    //const json = JSON.stringigy({ pwd: pwd }); 로 빼면 body: json, 만 넣으면 됌
    fetch(SERVER_URL + "/members/" + data?.id, {
      //로그인된 계정의 페이지를 가져와야하기때문에
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pwd: pwd, //앞pwd:backend_member  뒤pwd: useState
      }),
    })
      .then((response) => {
        if (response.ok) {
          //res.sucess랑은 다른 개념
          alert("비밀번호가 변경되었습니다.");
        } else {
          alert("비밀번호 변경에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        계정 관리
      </Typography>
      <Typography gutterBottom fontSize={15}>
        개인 정보 또는 계정 유형을 변경합니다.
      </Typography>
      <br />
      <Typography variant="h6" gutterBottom fontWeight="bold">
        내 계정
      </Typography>
      <Typography gutterBottom fontSize={12}>
        이메일 · 비공개
      </Typography>
      <TextField
        id="email"
        placeholder="이메일을 적어주세요"
        variant="outlined"
        style={{ width: "95%", height: "80px" }}
        value={email}
      />

      <br />
      <Typography gutterBottom fontSize={12}>
        비밀번호
      </Typography>
      <TextField
        id="password"
        type="password"
        placeholder="비밀번호를 적어주세요"
        autoComplete="current-password"
        style={{ width: "78%", height: "80px" }}
        onChange={(e) => {
          setPwd(e.target.value);
        }}
        value={pwd}
      />
      <Button
        variant="outlined"
        sx={{
          m: 2,
          color: "black",
          borderColor: "gray",
          bgcolor: "background.paper",
          fontWeight: "bold",
        }}
        onClick={changePwd}
      >
        변경
      </Button>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        개인 정보
      </Typography>

      <Typography gutterBottom fontSize={12}>
        생년월일
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
        <DatePicker
          onChange={(newBirth) =>
            setBirth(newBirth?.format("YYYY-MM-DD") ?? null)
          }
          value={dayjs(birth)}
          disableFuture
        />
        <div style={{ margin: "1em 0" }}></div>
      </LocalizationProvider>

      <FormControl>
        <Typography gutterBottom fontSize={12}>
          성별
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(_, value) => {
            setSex(value);
          }}
        >
          <FormControlLabel
            value="Male"
            control={<Radio />}
            label="남성"
            checked={sex === "Male"}
          />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="여성"
            checked={sex === "Female"}
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="둘다아님"
            checked={sex === "Other"}
          />
        </RadioGroup>
      </FormControl>
      <div style={{ margin: "1em 0" }}></div>

      <Typography gutterBottom fontSize={12}>
        국가/지역
      </Typography>
      <FormControl fullWidth>
        <Select onChange={handleChange} value={loc ?? ""}>
          <MenuItem value="nl">네덜란드</MenuItem>
          <MenuItem value="nz">뉴질랜드</MenuItem>
          <MenuItem value="tw">대만</MenuItem>
          <MenuItem value="kr">대한민국</MenuItem>
          <MenuItem value="de">독일</MenuItem>
          <MenuItem value="ru">러시아</MenuItem>
          <MenuItem value="mn">몽골</MenuItem>
          <MenuItem value="us">미국</MenuItem>
          <MenuItem value="vn">베트남</MenuItem>
          <MenuItem value="sa">사우디아라비아</MenuItem>
          <MenuItem value="se">스웨덴</MenuItem>
          <MenuItem value="ch">스위스</MenuItem>
          <MenuItem value="es">스페인</MenuItem>
          <MenuItem value="sg">싱가폴</MenuItem>
          <MenuItem value="gb">영국</MenuItem>
          <MenuItem value="au">오스트레일리아</MenuItem>
          <MenuItem value="ua">우크라이나</MenuItem>
          <MenuItem value="jp">일본</MenuItem>
          <MenuItem value="cn">중국</MenuItem>
          <MenuItem value="th">태국</MenuItem>
          <MenuItem value="ca">캐나다</MenuItem>
          <MenuItem value="pt">포르투갈</MenuItem>
          <MenuItem value="fr">프랑스</MenuItem>
          <MenuItem value="fi">핀란드</MenuItem>
          <MenuItem value="ph">필리핀</MenuItem>
          <MenuItem value="hu">헝가리</MenuItem>
        </Select>
      </FormControl>
      <div style={{ margin: "1em 0" }}></div>
    </Box>
  );
}
