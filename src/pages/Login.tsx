import { Button, Grid } from "@mui/material";
import { Location, Navigate, useLocation, useNavigate } from "react-router-dom";
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
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
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
