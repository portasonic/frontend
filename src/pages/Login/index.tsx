import React from "react";
import * as yup from "yup";
import { Field, Formik } from "formik";
import { TextField } from "formik-material-ui";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import { useAuth } from "../../api/portasonic/auth";
import { PRODUCT_NAME } from "../../globals";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginFormValidationSchema = yup.object({
  username: yup.string().required("Please enter a username."),
  password: yup.string().required("Please enter a password."),
});

export const Login = () => {
  const { login } = useAuth();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems={"center"}
      style={{
        height: "100%",
      }}
    >
      <Grid item xs={5}>
        <Paper elevation={3}>
          <Typography variant={"h4"}>{PRODUCT_NAME}</Typography>
          <Formik<LoginFormValues>
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginFormValidationSchema}
            onSubmit={async (values, formikHelpers) => {
              try {
                await login(values.username, values.password);
              } catch (e) {
                formikHelpers.setSubmitting(false);
                formikHelpers.setFieldError(
                  "password",
                  "Username or password incorrect."
                );
              }
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      submitForm();
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress /> : "Login"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  );
};
