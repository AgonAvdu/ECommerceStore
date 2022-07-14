import Avatar from "@mui/material/Avatar";
import { LoadingButton } from "@mui/lab";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { ACCOUNT_URL } from "../hoc/Variables";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "all" });

  function handleApiErrors(errors) {
    if (errors) {
      errors.forEach((error) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  async function registerUser(data) {
    try {
      await axios.post(ACCOUNT_URL + "/register", data);
    } catch (error) {
      const Errors = error.response.data.errors;
      let inputErrors = [];
      for (const key in Errors) {
        inputErrors.push(...Errors[key]);
      }
      handleApiErrors(inputErrors);
    } finally {
      navigate("/login");
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) => registerUser(data))}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoFocus
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username && errors.username.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                  message: "Not a valid Email Address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                  message:
                    "Password must have at least 1 upper case letter, 1 number and be more than 5 letters long ",
                },
              })}
              helperText={errors.password && errors.password.message}
            />
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/register">{"Already have an account? Sign in"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
