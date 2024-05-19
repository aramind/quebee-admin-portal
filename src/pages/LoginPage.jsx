import React, { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import zodLoginSchema from "../schemas/login";

import { useGlobalState } from "../context/ContextProvider";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { red } from "@mui/material/colors";
import useFormSubmit from "../hooks/useFormSubmit";
import FormWrapper from "../wrappers/FormWrapper";

const currentYear = new Date().getFullYear();
const LOGIN_URL = `${process.env.REACT_APP_API_URL}/v1/login`;

const LoginPage = () => {
  const { setAuth, persist, setPersist } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || "/";

  // states
  const { dispatch } = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  // form
  const { register, handleSubmit, isSubmitting, formState } = useForm({
    resolver: zodResolver(zodLoginSchema),
    mode: "onTouched",
  });
  const { errors } = formState;

  const formMethods = { register, handleSubmit, isSubmitting, formState };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleFormDataSubmit = async (data) => {
    try {
      const response = await axios.post(LOGIN_URL, data, {
        withCredentials: true,
      });
      if (response.data.success) {
        const user = response.data.data;
        console.log(user);
        if (user?.token) {
          dispatch({
            type: "SET_CURRENT_USER",
            payload: user,
          });
        }
        setAuth(user);

        navigate(from, { replace: true });
        alert(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "No server response. Please try again";
      alert(errorMessage);
    }
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

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

  return (
    <FormWrapper formMethods={formMethods}>
      <Stack
        height={{ xs: "90vh", md: "100vh" }}
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing="1rem"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
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
                sx={{ fontWeight: "bold" }}
              >
                QUEBEE
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
                  sx={localStyle.textfield}
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
                  sx={localStyle.textfield}
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
              <FormControlLabel
                sx={localStyle.checkbox}
                control={
                  <Checkbox
                    checked={persist}
                    onChange={() => setPersist((pv) => !pv)}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "0.9rem" }} disableGutter>
                    {" "}
                    Stay logged in in this device
                  </Typography>
                }
              />
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
    </FormWrapper>
  );
};

export default LoginPage;

const localStyle = {
  checkbox: {
    "& .MuiButtonBase-root": { pr: "5px" },
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      padding: "8px", // Reset padding for the root element of MuiOutlinedInput
    },
    "& .MuiOutlinedInput-input": {
      boxSizing: "content-box", // Reset box-sizing for the input element of MuiOutlinedInput
      padding: "8px", // Reset padding for the input element of MuiOutlinedInput
    },
    "& .MuiOutlinedInput-multiline": {
      boxSizing: "content-box", // Reset box-sizing for the multiline variant of MuiOutlinedInput
      padding: "8px", // Reset padding for the multiline variant of MuiOutlinedInput
    },
  },
};
