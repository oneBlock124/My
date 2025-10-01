import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("judge");
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = async () => {
    const success = await login(username, password, role);
    if (success) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "judge") {
        navigate("/judge");
      } else if (role === "viewer") {
        navigate("/results");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="judge">Judge</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" fullWidth onClick={handleLogin} sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
