import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
// import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { getCart } from "../../store/cartSlice";
import { getUser } from "../../store/accountSlice";
import SignedInMenu from "./SignedInMenu/SignedInMenu";

const Navbar = (props) => {
  const cart = useSelector(getCart);
  let itemCount = 0;
  if (cart) {
    itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  const user = useSelector(getUser);
  console.log(user);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        boxShadow: "0px 0px 10px black",
      }}
      className={styles.navbar}
    >
      <div>
        <Link className={styles.navItem} to="/">
          <Typography
            sx={{ display: "inline-block", fontSize: "1.8rem" }}
            color="text.secondary"
          >
            Logo
          </Typography>
        </Link>
        {/* <Switch
          color="secondary"
          sx
          checked={props.darkMode}
          onChange={props.handleThemeChange}
        /> */}
      </div>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          "&:hover": {
            color: "red",
            textDecorationColor: "red",
          },
          "&:active": {
            color: "red",
            textDecorationColor: "red",
          },
        }}
        autoComplete="off"
      >
        <Link className={styles.navItem} to="/gallery">
          <Typography
            sx={{ display: "inline-block", fontSize: "1.8rem" }}
            color="text.secondary"
          >
            Gallery
          </Typography>
        </Link>

        {user?.roles?.find((element) => {
          if (element.includes("Admin")) {
            return true;
          }
        }) && (
          <Link className={styles.navItem} to="/products">
            <Typography
              sx={{ display: "inline-block", fontSize: "1.8rem" }}
              color="text.secondary"
            >
              Products
            </Typography>
          </Link>
        )}
      </Box>

      <div>
        <Link className={styles.navItem} to="/cart">
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: 40, color: "text.secondary" }}
            />
          </Badge>
        </Link>

        {/* <Link className={styles.navItem} to="/profile">
          <AccountCircleOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 45 }}
          />
        </Link> */}

        {user ? (
          <SignedInMenu />
        ) : (
          <>
            <Link className={styles.navItem} to="/login">
              <Typography
                sx={{ display: "inline-block", fontSize: "1.8rem" }}
                color="text.secondary"
              >
                Login
              </Typography>
            </Link>
            <Link className={styles.navItem} to="/register">
              <Typography
                sx={{ display: "inline-block", fontSize: "1.8rem" }}
                color="text.secondary"
              >
                Register
              </Typography>
            </Link>
          </>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
