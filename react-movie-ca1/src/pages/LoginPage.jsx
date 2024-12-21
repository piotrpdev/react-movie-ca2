import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import GenericHeader from "../components/HeaderGeneric";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Alert from '@mui/material/Alert';

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

const LoginPage = () => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const isUsernameValid = () => userName.length > 0;

    const [passwordError, setPasswordError] = useState(false);
    const isPasswordValid = () => password.length > 0;

    const [loginError, setLoginError] = useState("");

    const login = async () => {
        setLoginError("");
        setUsernameError(!isUsernameValid());
        setPasswordError(!isPasswordValid());

        if (!isUsernameValid() || !isPasswordValid()) return;

        let response = await context.authenticate(userName, password);

        if (!response.success) {
            setLoginError(response.msg);
        }
    };

    let location = useLocation();

    // Set 'from' to path where browser is redirected after a successful login - either / or the protected path user requested
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <>
            <GenericHeader title="Login" />

            <Container maxWidth="sm" sx={{ marginTop: "30px" }}>
                <Grid size={{ xs: 4 }}>
                    <Card variant="outlined">
                        <CardContent>
                            <Stack spacing={1} sx={styles.root}>
                                <Typography variant="h5">
                                    Login
                                </Typography>

                                <Typography variant="subtitle1">You must log in to view the protected pages</Typography>

                                <Stack spacing={3} style={{ marginTop: "25px", marginBottom: "15px" }}>
                                    <TextField
                                        error={usernameError}
                                        helperText={usernameError ? "Username required" : ""}
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
                                        helperText={passwordError ? "Password required" : ""}
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
                                    <Button
                                        type="submit"
                                        onClick={login}
                                        variant="contained"
                                        size="medium"
                                        color="primary"
                                    >
                                        Log in
                                    </Button>

                                    {loginError && <Alert severity="error">{loginError}</Alert>}
                                </Stack>

                                <Typography variant="subtitle1">Not Registered? <Link to="/signup">Sign Up!</Link></Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </>
    );
};

export default LoginPage;
