import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // but on refresh the value of user becomes empty
  const [ready, setReady] = useState(false);

  // we use useEffect here to fetch the lost data on refresh, by using the /profile endpoint to fetch the cookie data
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);

          setReady(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
