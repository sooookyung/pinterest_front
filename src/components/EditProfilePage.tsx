import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
//import Button from "@mui/material-next/Button";
import Avatar from "@mui/material/Avatar";
import { User, useServerUser } from "../api/user";
import { SERVER_URL } from "../api/globals";
import { getImage, uploadImage } from "../api/image";

interface EditProfilePageProps {
  vars: {
    data?: User;
    imgFile: string;
    imgRef: React.RefObject<HTMLInputElement>;
    name: string;
    setImgFile: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
  };
}

export default function EditProfilePage({
  vars: { data, imgFile, setImgFile, imgRef, name, setName },
}: EditProfilePageProps) {
  //이미지 초기값 state

  // const name = data !==null && data ! == undefined ? data.name:"";
  // const name = data ? data.name : "";

  const changeImage = () => {
    if (imgRef.current?.files == null || imgRef.current.files.length === 0) {
      alert("이미지를 선택해주세요.");
      return;
    }
    uploadImage(imgRef.current.files[0])
      .then((imgSeq) => {
        return fetch(SERVER_URL + "/members/" + data?.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            upimage: "/upImages/" + imgSeq,
          }),
        });
      })
      .then((response) => {
        if (response.ok) {
          alert("이미지가 변경되었습니다.");
        } else {
          alert("이미지 변경에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (data?.id == null || data.upimage == null) {
      return;
    }
  }, [data?.id, data?.upimage]);

  const saveImgFile = () => {
    let file: File | null = null;
    if (imgRef.current?.files != null && imgRef.current?.files.length !== 0) {
      file = imgRef.current?.files[0];
    }

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImgFile(reader.result);
        }
      };
    }
  };
  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click(); // input 클릭 이벤트를 발생시킵니다.
    }
  };
  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        프로필 수정
      </Typography>
      <Typography gutterBottom fontSize={15}>
        개인 정보는 비공개로 유지하세요. 여기에 추가한 정보는 회원님의 프로필을
        볼 수 있는 모든 사람에게 표시됩니다.
      </Typography>
      <br />
      <Typography gutterBottom fontSize={12}>
        사진
      </Typography>

      <Avatar
        alt="Basic Avatar"
        src={imgFile}
        sx={{ width: 75, height: 75 }}
        variant="circular"
        onClick={handleImageClick}
      />

      {/* 사진바꾸기 기능  */}
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg, image/png, image/jpeg"
        name="profile_img"
        onChange={saveImgFile}
        ref={imgRef}
      />
      <Button
        sx={{
          marginTop: "15px",
          backgroundColor: "#dbdbdb",
          color: "black",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
        onClick={changeImage}
      >
        변경
      </Button>

      <Typography gutterBottom fontSize={12}>
        이름
      </Typography>
      <TextField
        id="outlined-multiline-flexible"
        placeholder="이름"
        multiline
        maxRows={4}
        style={{ width: "47.5%", height: "80px" }}
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />

      <Typography gutterBottom fontSize={12}>
        소개
      </Typography>

      <TextField
        id="outlined-multiline-static"
        placeholder="회원님의 이야기를 들려주세요"
        multiline
        rows={4}
        style={{ width: "95%", height: "150px" }}
      />
      <Typography gutterBottom fontSize={12}>
        웹 페이지
      </Typography>

      <TextField
        id="outlined-basic"
        placeholder="회원님의 사이트로 트래픽을 유도하는 링크를 추가하세요"
        variant="outlined"
        style={{ width: "95%", height: "80px" }}
      />
      <Typography gutterBottom fontSize={12}>
        사용자 이름
      </Typography>
      <TextField
        id="outlined-basic"
        placeholder="다른 사람들이 회원님을 찾을 수 있도록 잘 선택하세요"
        variant="outlined"
        style={{ width: "95%", height: "200px" }}
      />
    </Box>
  );
}
