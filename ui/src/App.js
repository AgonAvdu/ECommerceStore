import "./App.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Containers/Home";
import Profile from "./Containers/Profile";
import Gallery from "./Containers/Gallery";
import ProductDetails from "./Containers/ProductDetails";
import Categories from "./Containers/Category.js";
import Products from "./Containers/Products.js";
import { getProductsStatus, fetchProducts } from "./store/productsSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const productsStatus = useSelector(getProductsStatus);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  const paletteType = darkMode ? "light" : "dark";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      ...(paletteType === "dark"
        ? {
            primary: {
              main: "#646FD4",
              light: "#9BA3EB",
              dark: "#4a57cf",
            },
            secondary: {
              main: "#242F9B",
              light: "#DBDFFD",
              dark: "#161d61",
            },
            text: {
              primary: "#000",
              secondary: "#fff",
            },
            background: {
              paper: "#fff",
            },
            action: {
              hover: "#7683fb",
            },
          }
        : {
            primary: {
              main: "#9153F4",
              light: "#fff",
              dark: "#1d232b",
            },
            secondary: {
              main: "#EEEEEE",
              light: "#fff",
              dark: "#c4c2c2",
            },
            text: {
              primary: "#000",
              secondary: "#fff",
            },
            background: {
              paper: "#000",
            },
            action: {
              hover: "#7683fb",
            },
          }),
    },
  });

  function handleThemeChange() {
    setDarkMode((prev) => !prev);
  }

  return (
    <Box className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "background.paper" }}>
          <Navbar darkMode={darkMode} handleThemeChange={handleThemeChange} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/categories" element={<Categories />} />
            <Route path={`/products`} element={<Products />} />
            <Route path="/gallery/:id" element={<ProductDetails />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
