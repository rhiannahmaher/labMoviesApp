import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    authenticate && authenticate(username, password);
  };

  return (
    <>
      <h2>Login Page</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={login}>Submit</button>
    </>
  );
};

export default LoginPage;