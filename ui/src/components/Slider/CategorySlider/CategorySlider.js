import { useRef } from "react";
import Slider from "react-slick";
import CategorySlide from "./CategorySlideSkeleton/CategorySlideSkeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./CategorySlider.module.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function CategorySlider() {
  const settings = {
    infinite: true,
    lazyLoad: true,
    slidesToShow: 1,
    arrows: false,

    slidesToScroll: 1,
    centerMode: true,
  };
  const slider = useRef(null);

  return (
    <div className={styles.container}>
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
        className={styles.slider}
      >
        <Slider ref={slider} {...settings}>
          <CategorySlide />
          <CategorySlide />
          <CategorySlide />
        </Slider>
        <Button
          sx={{
            position: "absolute",
            bottom: "80px",
            right: "230px",
            fontSize: "3rem",
            color: "text.secondary",
            borderRadius: "50%",
            width: "20px",
            height: "60px",
            textAlign: "center",
          }}
          onClick={() => slider.current.slickPrev()}
        >
          {"<"}
        </Button>
        <Button
          sx={{
            position: "absolute",
            bottom: "80px",
            right: "130px",
            fontSize: "3rem",
            color: "text.secondary",
            borderRadius: "50%",
            width: "20px",
            height: "60px",
            textAlign: "center",
          }}
          onClick={() => slider.current.slickNext()}
        >
          {">"}
        </Button>
      </Box>
    </div>
  );
}
