import { Link as RouterLink } from "react-router-dom";

import { AppBar, Box, Button, Toolbar } from "@mui/material";

import { ReactComponent as Logo } from "../logo.svg";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Button to="/" component={RouterLink}>
              <Logo height="50px" width="50px" />
            </Button>
          </Box>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
