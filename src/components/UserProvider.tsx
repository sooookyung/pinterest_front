import { useState, type ReactNode } from "react";
import { User, SetUserContext, UserContext } from "../api/user";

export default function UserProvider({ children }: { children: ReactNode }) {
  let _user: User = null;
  const storedUser = JSON.parse(localStorage.getItem("user") ?? "null") as User;
  if (storedUser) {
    _user = storedUser;
  }
  const [user, setUser] = useState<User>(_user);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
