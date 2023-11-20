import Grid from "@mui/material/Grid";
import SignUp from "./SignUp";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FirstMainPage from "./MainPageNavBar";
export default function WelcomePage() {
  return (
    <Box
      // position="relative"
      overflow="auto"
      height="100vh"
      sx={{ scrollSnapType: "y mandatory" }}
    >
      <FirstMainPage />
      <Box>
        <Grid container height="64px"></Grid>
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          height="calc(100vh - 64px)"
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers&1)",
            backgroundSize: "cover",
            scrollSnapAlign: "end",
          }}
        >
          <Grid item>
            <Typography
              color="primary"
              variant="h2"
              sx={{
                fontWeight: "bold",
                textShadow: "0 0 1em skyblue, 0 0 0.2em skyblue",
              }}
            >
              좋아하는 아이디어를 저장하세요.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          height="calc(100vh - 64px)"
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers&2)",
            backgroundSize: "cover",
            scrollSnapAlign: "end",
          }}
        >
          <Grid item>
            <Typography
              color="primary"
              variant="h2"
              sx={{
                fontWeight: "bold",
                textShadow: "0 0 1em skyblue, 0 0 0.2em skyblue",
              }}
            >
              아이디어를 검색하세요.
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          height="calc(100vh - 64px)"
          sx={{ scrollSnapAlign: "end" }}
        >
          <Grid
            item
            container
            alignContent="center"
            justifyContent="center"
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers&3)",

              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Grid item>
              <Typography
                color="white"
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  textShadow: "0 0 1em darkred, 0 0 0.2em darkred",
                }}
              >
                가입하여 더 많은 아이디어를 만나보세요.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <SignUp />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
