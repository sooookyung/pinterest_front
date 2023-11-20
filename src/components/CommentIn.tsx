import { Button, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useState } from "react";
import { SERVER_URL } from "../api/globals";
import { useParams } from "react-router-dom";
import { useUser } from "../api/user";

export default function CommentIn() {
  const { seq: pinSeq } = useParams();
  const [content, setContent] = useState("");
  const [user] = useUser();
  const userId = user?.id;

  const contentInBuilder = async () => {
    const data = await fetch(`${SERVER_URL}/commentInPins`, {
      method: "POST",
      body: JSON.stringify({
        content: content,
        pin: `${SERVER_URL}/pins/${pinSeq}`,
        writer: `${SERVER_URL}/members/${userId}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("댓글이 등록되었습니다");
        location.reload();
      }
    });
    return data.json() as Promise<Comment>;
  };
  return (
    <>
      <TextField
        id="outlined-multiline-flexible"
        multiline
        maxRows={4}
        fullWidth
        sx={{
          height: "100%",
          width: "320px",
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        color="error"
        sx={{
          marginLeft: 2,
          backgroundColor: "red",
        }}
        onClick={() => {
          contentInBuilder().catch((e) => {
            console.error(e);
          });
        }}
      >
        <SendRoundedIcon sx={{ color: "white" }} />
      </Button>
    </>
  );
}
