import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextInterface {
  token: string | null;
  authenticate: (username: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isPremium: boolean;
  signout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {
  const [token, setToken] = useState<string|null>(null);
  const isAuthenticated = !!token;
  const isPremium = isAuthenticated;
  const location = useLocation();
  const navigate = useNavigate();

  const fakeAuth = async (username: string, password: string) => {
    if (username === "user" && password === "password") {
      return "demo-token";
    }
    throw new Error("Invalid credentials");
  };

  const authenticate = async (username: string, password: string) => {
    const token = await fakeAuth(username, password);
    setToken(token);
      const origin = location.state?.intent?.pathname || "/";
      navigate(origin);
    setIsPremium(username === "premium");
  };

  const signout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token, 
        authenticate,
        isAuthenticated,
        isPremium,
        signout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;