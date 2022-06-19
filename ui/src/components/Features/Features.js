import EuroIcon from "@mui/icons-material/Euro";
import styles from "./Features.module.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import GppGoodIcon from "@mui/icons-material/GppGood";
import PeopleIcon from "@mui/icons-material/People";

import { Typography } from "@mui/material";

const Features = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${styles.border}`}>
        <EuroIcon className={styles.icon} sx={{ color: "primary.main" }} />
        <Typography color="primary.main" sx={{ fontSize: "1.8rem" }}>
          Great Value
        </Typography>
        <Typography color="primary.main">
          We offer competitive prices on over 100 million items
        </Typography>
      </div>
      <div className={`${styles.wrapper} ${styles.border}`}>
        <CreditCardIcon
          className={styles.icon}
          sx={{ color: "primary.main" }}
        />
        <Typography color="primary.main" sx={{ fontSize: "1.8rem" }}>
          Safe payment
        </Typography>
        <Typography color="primary.main">
          Pay with the world’s most popular and secure payment methods.
        </Typography>
      </div>
      <div className={`${styles.wrapper} ${styles.border}`}>
        <GppGoodIcon className={styles.icon} sx={{ color: "primary.main" }} />
        <Typography color="primary.main" sx={{ fontSize: "1.8rem" }}>
          Shop with confidence
        </Typography>
        <Typography color="primary.main">
          Our Buyer Protection policy covers your entire purchase journey.
        </Typography>
      </div>
      <div className={`${styles.wrapper} ${styles.border}`}>
        <PeopleIcon className={styles.icon} sx={{ color: "primary.main" }} />
        <Typography color="primary.main" sx={{ fontSize: "1.8rem" }}>
          Help center
        </Typography>
        <Typography color="primary.main">
          Round-the-clock assistance for a smooth shopping experience.
        </Typography>
      </div>
    </div>
  );
};

export default Features;
