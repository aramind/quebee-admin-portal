import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import zodLoginSchema from "../schemas/login";
import findUser from "../utils/login/authenticateUser";
import { useGlobalState } from "../context/ContextProvider";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";

const currentYear = new Date().getFullYear();
const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  // states
  const {
    globalState: { currentUser },
    dispatch,
  } = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);

  // const navigate = useNavigate();
  // useEffects
  // useEffect(() => {
  //   if (authenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [authenticated, navigate]);

  // form
  const { register, handleSubmit, isSubmitting, formState } = useForm({
    resolver: zodResolver(zodLoginSchema),
    mode: "onTouched",
  });
  const { errors } = formState;

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onError = (errors) => {
    console.log("Form errors", errors);
    setSubmitMessage((message) => "Error submitting form. Try again later.");
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(LOGIN_URL, data);
      console.log(response);
      if (response.data.success) {
        const user = response.data.data;
        console.log(user);
        console.log(user.role);

        if (user?.token) {
          dispatch({
            type: "SET_CURRENT_USER",
            payload: user,
          });
        }
        setAuth(user);
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "No server response. Please try again";
      alert(errorMessage);
    }
  };

  // const onSubmit2 = (data) => {
  //   const authenticatedUser = findUser(data);
  //   console.log("USER", authenticatedUser);

  //   if (authenticatedUser) {
  //     setSubmitMessage((message) => "Login successful");
  //     dispatch({
  //       type: "SET_CURRENT_USER",
  //       payload: {
  //         username: authenticatedUser.username,
  //         role: authenticatedUser.role,
  //       },
  //     });

  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({
  //         name: authenticatedUser.username,
  //         role: authenticatedUser.role,
  //       })
  //     );
  //     setAuthenticated((authenticated) => true);
  //   } else {
  //     setSubmitMessage((message) => "Invalid Credentials");
  //   }
  // };

  console.log("CURRENTUSER:", currentUser);

  return (
    <Stack
      height={{ xs: "90vh", md: "100vh" }}
      justifyContent="center"
      alignItems="center"
      direction="column"
      spacing="1rem"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack
          height={{ xs: "100vw", md: "80vh" }}
          width={{ xs: "80vw", md: "80vh" }}
          maxWidth="600px"
          maxHeight="600px"
          py={{ xs: 2, md: 4 }}
          px={{ xs: 2, md: 8 }}
          gap={{ xs: 2, md: 4 }}
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
            <Typography
              variant="h5"
              display="inline"
              color="tertiary.dark"
              sx={{ fontWeight: "bold" }}
            >
              Admin Portal
            </Typography>
          </Stack>
          <Stack gap={3}>
            <Stack>
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                error={!!errors.username}
                {...register("username")}
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
                error={!!errors.password}
                {...register("password")}
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
            <Typography
              variant="body1"
              // color={!!authenticated ? "green" : "error"}
            >
              {submitMessage}
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ padding: "1rem" }}
              type="submit"
              disabled={isSubmitting}
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
          rel="noreferrer"
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
