import { Box, Typography } from "@mui/material";
import React from "react";
import HeaderSlider from "../components/Slider/HeaderSlider/HeaderSlider";
import CategorySlider from "../components/Slider/CategorySlider/CategorySlider";
import AllProductsSlider from "../components/Slider/AllProductsSlider/AllProductsSlider";
import Features from "../components/Features/Features";
import { Container } from "@mui/material";

const Home = () => {
  return (
    <div>
      <HeaderSlider />

      <Box display="flex" justifyContent="center" sx={{ p: 6 }}>
        <Typography
          sx={{
            letterSpacing: 30,
            fontWeight: "bold",
          }}
          color="secondary"
          variant="h1"
        >
          Welcome
        </Typography>
      </Box>
      {/* <AllProductsSlider /> */}
      <Features />
      {/* <CategorySlider /> */}
    </div>
  );
};

export default Home;
