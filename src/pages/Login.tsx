import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";

import { Button, Grid, Typography } from "@mui/material";

import { EMAIL_DOMAIN } from "../firebase-config";
import useAuth from "../helpers/auth";

export function Login() {
  const { userEmail, login } = useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const signin = async () => {
    await login();
    navigate(from, { replace: true });
  };

  if (userEmail === null) {
    return (
      <Grid
        container
        sx={{
          alignItems: "center",
          mt: "10%",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" gutterBottom paragraph textAlign="center">
            You can only use @{EMAIL_DOMAIN} emails. Otherwise you'll be logged
            out!
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button onClick={signin}>
            <img
              src="/assets/btn_google_signin_dark_normal_web.png"
              alt="Google login"
            />
          </Button>
        </Grid>
      </Grid>
    );
  }

  return <Navigate to={from} replace />;
}
