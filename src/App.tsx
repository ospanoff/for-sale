import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SaleList from "./pages/SaleList";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box sx={{ paddingTop: 3 }}>
          <SaleList />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
