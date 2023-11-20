import { Button } from "@mui/material";
import { useUser } from "../api/user";

function Feed() {
  const [, setUser] = useUser();
  function doLogout() {
    localStorage.removeItem("user");
    setUser(null);
    location.href = "/";
  }
  return (
    <div>
      <h1>Feed</h1>
      <p>
        <Button href="/profile">프로필</Button>
      </p>
      <p>
        <Button onClick={doLogout}>로그아웃</Button>
      </p>
    </div>
  );
}
export default Feed;
