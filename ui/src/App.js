import "./App.css";

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Containers/Home";
import Profile from "./Containers/Profile/Profile";
import Orders from "./Containers/Profile/Orders";

import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Gallery from "./Containers/Gallery";
import ProductDetails from "./Containers/ProductDetails";
import Categories from "./Containers/Category.js";
import Cart from "./Containers/Cart";
import Products from "./Containers/Admin/Products";

import { fetchCartAsync } from "./store/cartSlice";
import { fetchCurrentUser } from "./store/accountSlice";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "./util/RequireAuth";
import CheckoutWrapper from "./Containers/Checkout/CheckoutWrapper";

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

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
              disabled: "rgba(0, 0, 0, 0.26)",
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
            <Route path="/cart" element={<Cart />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/gallery/:id" element={<ProductDetails />} />

            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <CheckoutWrapper />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Orders />
                </RequireAuth>
              }
            />
            <Route
              path="/products"
              element={
                <RequireAuth>
                  <Products />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Box>
  );
}

export default App;
