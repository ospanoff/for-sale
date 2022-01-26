import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Navigate, Route, Routes } from "react-router-dom";

import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ItemPage from "./pages/ItemPage";
import SaleList from "./pages/SaleList";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Routes>
          <Route index element={<SaleList />} />
          <Route path="item/:itemId" element={<ItemPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
