import React, { useState } from "react";

import { login, signup } from "../api/movies-api";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = (props) => {
  // const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    // setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);

    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
    }

    return result;
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    console.log(result.code);

    return result;
  };

  const signout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUserName("");
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
