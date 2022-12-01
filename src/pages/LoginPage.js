import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Alert,
  Box,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Button,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";

import useAuth from "../hooks/useAuth";
import googleImg from "../images/ggleImg.png";
import { BASE_URL } from "../app/config";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LogInPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ position: "absolute", left: "5%", top: "5%" }}
        name="breadcrumbs"
      >
        <Breadcrumbs color="#fff" m={1} separator="›" aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", color: "#fff" }}
            href="/"
          >
            <HomeIcon sx={{ color: "#fff", mr: 0.5 }} fontSize="inherit" />
            SNEAKER STORE
          </Link>
          <Typography color="#fff">Login</Typography>
        </Breadcrumbs>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors?.responseError && (
            <Alert severity="error">{errors?.responseError.message}</Alert>
          )}
          <Alert severity="info">
            {" "}
            Don't have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>
          <FTextField name="email" label="Email" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff color="info" />
                    ) : (
                      <Visibility color="info" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to="#"
              color="#FFF"
            >
              Forgot password?
            </Link>
          </Box>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
            color="info"
          >
            Log In
          </LoadingButton>
          <Button
            mt={2}
            href={`${BASE_URL}/auth/google`}
            component={Link}
            fullWidth
            size="large"
            variant="contained"
            color="info"
          >
            <Box
              sx={{
                mr: 2,
                alignContent: "center",
                display: "flex",
                justifyContent: "center",
              }}
              component="div"
            >
              <img
                height="25px"
                width="25px"
                src={googleImg}
                alt="googleButton"
              />
            </Box>
            Login With Google
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LogInPage;
