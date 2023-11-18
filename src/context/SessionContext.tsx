import { PropsWithChildren, createContext, useState, useEffect } from "react";

type SessionContextType = {
  jwtToken: string;
  login: (credenciales: CredencialesLogin) => Promise<boolean>;
};

type CredencialesLogin = {
  username: string;
  password: string;
};

export const SessionContext = createContext<SessionContextType>({
  jwtToken: "",
  login: async (credenciales: CredencialesLogin) => false,
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [jwtToken, setJwtToken] = useState("");

  const login = async (credenciales: CredencialesLogin) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_AUTH_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credenciales),
        }
      );
      const data = await response.json();
      setJwtToken(data.token)
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
