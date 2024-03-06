import { createContext, useEffect, useState } from "react";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user") || null),
};

console.log("INITIAL_STATE", INITIAL_STATE);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(INITIAL_STATE.currentUser);
  console.log("currentUser", currentUser);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const values = {
    currentUser,
    setCurrentUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContext;
