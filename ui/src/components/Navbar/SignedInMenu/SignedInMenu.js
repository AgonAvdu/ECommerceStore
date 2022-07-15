import { Button, Fade, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { signOut } from "../../../store/accountSlice";
import { clearCart } from "../../../store/cartSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";

export default function SignedInMenu() {
  const dispatch = useDispatch();
  // const user = useSelector(getUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  function signOutClick() {
    dispatch(signOut());
    navigate("/");
  }

  return (
    <>
      <Button
        sx={{ typography: "h6", color: "text.secondary" }}
        onClick={handleClick}
      >
        <AccountCircleOutlinedIcon
          sx={{ color: "text.secondary", fontSize: 45 }}
        />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to="/orders" onClick={handleClose}>
          My orders
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOutClick();
            dispatch(clearCart());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
