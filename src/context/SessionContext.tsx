import { PropsWithChildren, createContext, useState, useEffect } from "react";

type SessionContextType = {
  jwtToken: string;
  login: (credenciales: CredencialesLogin) => boolean;
};

type CredencialesLogin = {
  username: string;
  password: string;
};

export const SessionContext = createContext<SessionContextType>({
  jwtToken: "",
  login: (credenciales: CredencialesLogin) => false,
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [jwtToken, setJwtToken] = useState("");

  const login = async (credenciales: CredencialesLogin) => {
    console.log("entranddndndn");
    try {
      console.log(credenciales);
      const response = await fetch(
        `${import.meta.env.VITE_AUTH_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(credenciales),
        }
      );
      const data = response.json();
      console.log(data, response);
      return true;
    } catch (e: unknown) {
      console.log(e);
      return false;
    }
  };

  const guardarToken = (token: string) => {};
  useEffect(() => {
    try {
      localStorage.getItem("token");
    } catch (e: unknown) {
      console.log(e);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ login, jwtToken }}>
      {children}
    </SessionContext.Provider>
  );
};
