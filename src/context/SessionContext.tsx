import { PropsWithChildren, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

type SessionContextType = {
  jwtToken: string;
  isLogged: boolean;
  login: (credenciales: CredencialesLogin) => Promise<boolean>;
};

type CredencialesLogin = {
  username: string;
  password: string;
};

export const SessionContext = createContext<SessionContextType>({
  jwtToken: "",
  isLogged: false,
  login: async (credenciales: CredencialesLogin) => false,
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [jwtToken, setJwtToken] = useState("");
  const [isLogged, setIsLogged] = useState(false)

  const login = async (credenciales: CredencialesLogin) => {
    try {
      const response = await fetch(
        `https://buensabor-api.onrender.com/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credenciales),
        }
      );
      const data = await response.json();
      console.log(data.token)
      setIsLogged(true)
      setJwtToken(data.token)
      guardarToken(data.token)
      return true;
    } catch (e: unknown) {
      console.log(e);
      toast.error("No pudo autenticarse")
      return false;
    }
  };

  const guardarToken = (token: string) => {
    localStorage.setItem("token", token)
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      if(token) {
        setJwtToken(token)
        setIsLogged(true)
      }
    } catch (e: unknown) {
      console.log(e);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ login, jwtToken, isLogged }}>
      {children}
    </SessionContext.Provider>
  );
};
