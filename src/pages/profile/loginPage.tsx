import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate && authenticate(username, password);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#181818"
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 350,
          backgroundColor: "#23272f",
          color: "white",
          textAlign: "center"
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
          Login
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "grey.400" }}>
          Use <b style={{ color: '#ffd600' }}>user</b> and <b style={{ color: '#ffd600' }}>password</b> for testing purposes.
        </Typography>
        <form onSubmit={login}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ mb: 3, input: { fontSize: 22, color: "white" } }}
            InputLabelProps={{ sx: { color: "#bbb" } }}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            size="medium"
            sx={{ mb: 4, input: { fontSize: 22, color: "white" } }}
            InputLabelProps={{ sx: { color: "#bbb" } }}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontSize: 22, py: 1.5, px: 4 }}
            fullWidth
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;