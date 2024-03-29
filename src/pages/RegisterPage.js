import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Container } from "@mui/system";
import {
  Alert,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Box,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import HomeIcon from "@mui/icons-material/Home";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import useAuth from "../hooks/useAuth";

const styles = {
  boxCoverBreakCrum: { position: "absolute", left: "5%", top: "5%" },
};

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Password must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={styles.boxCoverBreakCrum} name="breadcrumbs">
        <Breadcrumbs color="#fff" m={1} separator="›" aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center", color: "#fff" }}
            color="inherit"
            href="/"
          >
            <HomeIcon sx={{ color: "#fff", mr: 0.5 }} fontSize="inherit" />
            SNEAKER STORE
          </Link>
          <Typography color="#fff">Register</Typography>
        </Breadcrumbs>
      </Box>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors?.responseError && (
            <Alert severity="error">{errors?.responseError.message}</Alert>
          )}
          <Alert severity="info">
            {" "}
            Already have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign in
            </Link>
          </Alert>
          <FTextField
            name="name"
            label="Full name"
            border="info.main"
            borderFocus="secondary.main"
            borderHover="secondary.lighter"
            labelColor="#fff"
          />

          <FTextField
            name="email"
            label="Email"
            border="info.main"
            borderFocus="secondary.main"
            borderHover="secondary.lighter"
            labelColor="#fff"
          />

          <FTextField
            name="password"
            label="Password"
            border="info.main"
            borderFocus="secondary.main"
            borderHover="secondary.lighter"
            labelColor="#fff"
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
                      <Visibility color="info" />
                    ) : (
                      <VisibilityOff color="info" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            border="info.main"
            borderFocus="secondary.main"
            borderHover="secondary.lighter"
            labelColor="#fff"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <Visibility color="info" />
                    ) : (
                      <VisibilityOff color="info" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            color="info"
            type="submit"
            loading={isSubmitting}
            fullWidth
            size="large"
            variant="contained"
            mb={2}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
