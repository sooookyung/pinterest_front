import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ProfileFooter({ onSave }: { onSave: () => void }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetHandler = () => {
    location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", bottom: "0", width: "100%" }}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12}>
          <Item>
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              sx={{
                m: 1,
                color: "black",
                borderColor: "gray",
                bgcolor: "background.paper",
                fontWeight: "bold",
              }}
            >
              재설정
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"계속할까요?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  변경 사항이 저장되지 않습니다.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={resetHandler} autoFocus>
                  변경사항 재설정
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="outlined"
              sx={{
                m: 2,
                color: "black",
                borderColor: "gray",
                bgcolor: "background.paper",
                fontWeight: "bold",
              }}
              onClick={onSave}
            >
              저장
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
