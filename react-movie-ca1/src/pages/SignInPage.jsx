import GitHubIcon from "@mui/icons-material/GitHub";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { useState } from "react";

import { supabase } from "../supabaseClient";

const SignInPage = () => {
  const [error, setError] = useState(null);
  async function signInWithGithub() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) setError(error.message);
  }

  return (
    <Container
      id="signin-bg"
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        id="signin"
        variant="contained"
        size="large"
        startIcon={<GitHubIcon />}
        onClick={signInWithGithub}
        sx={{ textTransform: "none", color: "white" }}
      >
        Sign in with Github
      </Button>
      {error && (
        <Alert severity="error" variant="filled" sx={{ marginTop: 4 }}>
          {error.name}
        </Alert>
      )}
    </Container>
  );
};

export default SignInPage;
