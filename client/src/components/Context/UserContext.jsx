import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const fetchUserData = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      const accessTokenData = JSON.parse(sessionStorage.getItem("accessToken"));

      setUser(userData);
      setAccessToken(accessTokenData);
    } catch (error) {
      console.log("Error retrieving user:", error);
    }
  };

  const deleteUserData = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem("userData"));

      setUser(userData.fname);
    } catch (error) {
      console.log("Error retrieving user:", error);
    }
  };

  const setUserData = async (accessToken, userData) => {
    try {
      sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
      sessionStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.log("Error retrieving user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, fetchUserData, deleteUserData, setUserData, accessToken }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
