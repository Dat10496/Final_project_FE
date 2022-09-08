import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Container } from "@mui/system";
import {
  Alert,
  Box,
  Stack,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

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
  const auth = useAuth();
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

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate("/admin", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors?.responseError && (
            <Alert severity="error">{errors?.responseError.message}</Alert>
          )}
          <Alert severity="info">
            {" "}
            Don't have an account?
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="/admin/register"
            >
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
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
              to="/"
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
          >
            Log In
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LogInPage;
