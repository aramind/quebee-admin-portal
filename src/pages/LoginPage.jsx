import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <Stack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing="10px"
    >
      <Stack
        height="80vh"
        width="80vh"
        maxWidth="600px"
        maxHeight="600px"
        py={4}
        px={8}
        gap={4}
        borderRadius="10px"
        direction="column"
        justifyContent="center"
        boxShadow="3"
      >
        <Stack direction="row" gap={2} justifyContent="center">
          <Typography
            variant="h5"
            display="inline"
            color="primary"
            sx={{ fontWeight: "bold", fontStyle: "italic" }}
          >
            eTHERIA
          </Typography>
          <Typography variant="h5" display="inline" color="gray">
            Admin Portal
          </Typography>
        </Stack>
        <TextField id="userName" label="Username" variant="outlined" />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" size="large" sx={{ padding: "1rem" }}>
          Login
        </Button>
      </Stack>
      <Typography
        variant="caption"
        color="gray"
        sx={{ fontStyle: "italic", letterSpacing: "1px" }}
      >
        Powered by{" "}
        <a href="#" className="company-link">
          RMSolutions&trade;
        </a>
      </Typography>
    </Stack>
  );
};

export default LoginPage;
