import {
  Box,
  Grid,
  Slide,
  Alert,
  Button,
  Snackbar,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import style from "./style";
import Text from "../../components/Text";

const Login = () => {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^(\+92)?\d{10}$|^\d{11}$/, "Invalid phone number")
      .required("Required"),
    password: Yup.string().required("Required").min(6),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    axios
      .post(`${baseUrl}/auth/adminLogin`, values)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          console.log("Login successfully", response.data);
          navigate("/trips");
        } else {
          setOpenSnackbar(true);
          console.error("Error:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container sx={style.background}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        TransitionComponent={Slide}
        TransitionProps={{ direction: "right" }}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert sx={style.alert} severity="error">
          <Text variant="subtitl1" text="Invalid phone number or password!" />
        </Alert>
      </Snackbar>

      <Grid container sx={style.container}>
        <Formik
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Grid container item md={5}>
              <Form style={style.form}>
                <Grid container gap={3} sx={style.login}>
                  <Text variant="h1" text="User Login" sx={style.heading} />
                  <Box>
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Phone number"
                      variant="outlined"
                      fullWidth
                    />
                    {status && <div style={style.error}>{status}</div>}
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      style={style.error}
                    />
                  </Box>

                  <Box>
                    <Field
                      as={TextField}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="Password"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      style={style.error}
                    />
                  </Box>

                  <Link to="#" style={style.forgetPswd}>
                    <Text variant="body2" text="Forget Password?" />
                  </Link>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    sx={style.button}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Grid>
              </Form>
            </Grid>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default Login;
