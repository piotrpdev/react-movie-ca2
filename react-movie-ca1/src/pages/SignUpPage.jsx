import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import Grid from "@mui/material/Grid2";
import GenericHeader from "../components/HeaderGeneric";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";

const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    form: {
      width: "100%",
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
  formControl: {
    margin: 1,
    minWidth: 220,
  }
};

// @@@@@aS1
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const SignUpPage = () => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const isUsernameValid = () => userName.length > 0;

  const [passwordError, setPasswordError] = useState(false);
  const isPasswordValid = () => passwordRegEx.test(password);

  const [passwordAgainError, setPasswordAgainError] = useState(false);
  const isPasswordAgainValid = () => password === passwordAgain;

  const register = () => {
    setUsernameError(!isUsernameValid());
    setPasswordError(!isPasswordValid());
    setPasswordAgainError(!isPasswordAgainValid());

    if (isUsernameValid() && isPasswordValid() && isPasswordAgainValid()) {
      context.register(userName, password);
      setRegistered(true);
    }
  }

  if (registered === true) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <GenericHeader title="Sign Up" />

      <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
          <Grid size={{ xs: 4 }}>
              <Card variant="outlined">
                  <CardContent>
                      <Stack spacing={1} sx={styles.root}>
                          <Typography variant="h5">
                              Sign Up
                          </Typography>

                          <Typography variant="subtitle1">You must register a username and password to log in</Typography>

                          <Stack spacing={3} style={{ marginTop: "25px", marginBottom: "15px" }}>
                              <TextField
                                  error={usernameError}
                                  helperText={usernameError ? "Username is required" : ""}
                                  sx={ styles.formControl }
                                  id="username"
                                  label="Username"
                                  variant="filled"
                                  value={userName}
                                  onChange={(e) => {
                                      setUserName(e.target.value);
                                  }}
                                  autoWidth
                              />
                              <TextField
                                  error={passwordError}
                                  helperText={passwordError ? "Need 8 characters, one letter, one number and one special character" : ""}
                                  sx={ styles.formControl }
                                  id="password"
                                  type="password"
                                  label="Password"
                                  variant="filled"
                                  value={password}
                                  onChange={(e) => {
                                      setPassword(e.target.value);
                                  }}
                                  autoWidth
                              />
                              <TextField
                                  error={passwordAgainError}
                                  helperText={passwordAgainError ? "Passwords must match" : ""}
                                  sx={ styles.formControl }
                                  id="passwordAgain"
                                  type="password"
                                  label="Password (Again)"
                                  variant="filled"
                                  value={passwordAgain}
                                  onChange={(e) => {
                                      setPasswordAgain(e.target.value);
                                  }}
                                  autoWidth
                              />
                              <Button
                                  type="submit"
                                  onClick={register}
                                  variant="contained"
                                  size="medium"
                                  color="primary"
                              >
                                  Sign Up
                              </Button>
                          </Stack>
                      </Stack>
                  </CardContent>
              </Card>
          </Grid>
      </Container>
    </>
  );
};

export default SignUpPage;
