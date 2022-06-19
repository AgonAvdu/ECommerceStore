import styles from "./CategorySlideSkeleton.module.css";
import { Box } from "@mui/material";
import ProductCard from "../../../Product/ProductCard/ProductCard";
import Slider from "react-slick";
import { Typography } from "@mui/material";

const CategorySlideSkeleton = () => {
  var settings = {
    infinite: true,
    speed: 200,
    lazyLoad: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box
      sx={{
        width: 1,
      }}
      className={styles.container}
    >
      <Box
        className={styles.wrapper}
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
      >
        <Box gridColumn="span 8">
          <Slider className={styles.products} {...settings}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Slider>
        </Box>
        <Box className={styles.description} gridColumn="span 4">
          <Typography
            color="secondary.light"
            sx={{ fontSize: "48px", fontWeight: "bold" }}
          >
            Category
          </Typography>
          <Typography color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis
            nisi eget nibh ultrices sagittis. Aenean eget diam quis sapien
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CategorySlideSkeleton;
