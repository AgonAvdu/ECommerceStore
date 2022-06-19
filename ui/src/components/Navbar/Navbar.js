import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";

const Navbar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef();

  function handleClick() {
    // 👇️ access input value
    console.log(searchInput);
  }

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
        <Switch
          color="secondary"
          sx={{
            display: "none",
          }}
          checked={props.darkMode}
          onChange={props.handleThemeChange}
        />
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
        InputProps={{}}
        noValidate
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        autoComplete="off"
      >
        <TextField
          ref={inputRef}
          id="standard-basic"
          label="Search Product"
          variant="standard"
          color="background"
          sx={{ width: "20rem" }}
        />
        <Link to={`/search="${searchInput}"`}>
          <SearchIcon
            sx={{
              fontSize: "2rem",
              position: "absolute",
              top: "1rem",
              left: "18rem",
              color: "text.primary",
            }}
            onClick={handleClick}
          />
        </Link>
      </Box>

      <div>
        <Link className={styles.navItem} to="/cart">
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartOutlinedIcon
              sx={{ fontSize: 40, color: "text.secondary" }}
            />
          </Badge>
        </Link>

        <Link className={styles.navItem} to="/profile">
          <AccountCircleOutlinedIcon
            sx={{ color: "text.secondary", fontSize: 45 }}
          />
        </Link>
      </div>
    </Box>
  );
};

export default Navbar;
