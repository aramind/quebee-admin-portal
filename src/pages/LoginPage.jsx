import React, { useEffect, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ErrorOutlineSharp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";

const currentYear = new Date().getFullYear();

const LoginPage = () => {
  // states
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [authenticated, setAuthenticated] = useState("false");

  // other values
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated]);
  // form
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit = (data) => {
    const { username, password } = data;
    // console.log(data);
    console.log(`logging in: USERNAME ${username} PASSWORD ${password}`);
    if (username === "mon" && password === "123123") {
      setAuthenticated((pv) => (pv = true));
      setLoginErrorMessage("Authenticated Successfully");
    } else {
      setLoginErrorMessage("Invalid credentials");
    }
  };
  return (
    <Stack
      height="100vh"
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing="10px"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <Stack gap={3}>
            <Stack>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                error={Boolean(errors.username)}
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                })}
              />
              <Typography
                variant="caption"
                display="block"
                textAlign="left"
                px={0.5}
                color="red"
                height="12px"
              >
                {errors.username?.message}
              </Typography>
            </Stack>
            <Stack>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password)}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography
                variant="caption"
                display="block"
                textAlign="left"
                px={0.5}
                color="red"
                height="12px"
              >
                {errors.password?.message}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={1}>
            <Typography variant="caption" color="red" height="12px">
              {loginErrorMessage}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: "1rem" }}
              type="submit"
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
      <Typography
        variant="caption"
        color="gray"
        sx={{ fontStyle: "italic", letterSpacing: "1px" }}
      >
        Powered by{" "}
        <a
          href="https://www.linkedin.com/in/robin-mon-miranda/"
          target="_blank"
          className="company-link"
        >
          RMSolutions&trade;
        </a>
        &nbsp;&copy;{currentYear}
      </Typography>
    </Stack>
  );
};

export default LoginPage;
