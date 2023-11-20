import PinNavBar from "./PinNavBar";
import Pin from "./Pin";
import { useFeed } from "../api/feed";
import { Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface PinLayoutProps {
  hideNavBar?: boolean;
  username?: string;
  type?: "created" | "saved";
}

function PinLayout({ hideNavBar, username, type }: PinLayoutProps) {
  const { inputValue } = useParams();

  const { status, error, data, fetchNextPage } = useFeed(
    username,
    inputValue,
    type,
  );
  const { inView, ref } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch((e) => {
        console.error(e);
      });
    }
  }, [inView, fetchNextPage, data]);

  return status === "pending" ? (
    <p>Loading...</p>
  ) : status === "error" ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {!hideNavBar && <PinNavBar />}
      <div style={{ paddingTop: "55px" }}>
        {!data.pages[0] ? (
          <Typography align="center" sx={{ marginTop: "20px" }}>
            해당하는 핀이 없습니다.
          </Typography>
        ) : (
          <div style={styles.pin_container}>
            {data.pages.map((src, i) => (
              <Pin key={i} src={src} pinSeq={data.pageParams[i] as number} />
            ))}
            <div ref={ref}></div>
          </div>
        )}
      </div>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  pin_container: {
    padding: 0,
    width: "95vw",
    backgroundColor: "white",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 250px)",
    gridAutoRows: "8px",
    justifyContent: "center",
    marginTop: 20,
  },
};

export default PinLayout;
