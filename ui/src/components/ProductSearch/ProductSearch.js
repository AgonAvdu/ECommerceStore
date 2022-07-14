import { TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getProductParams, setProductParams } from "../../store/productsSlice";
import { useState } from "react";
export default function ProductSearch() {
  const dispatch = useDispatch();
  const productParams = useSelector(getProductParams);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      dispatch(setProductParams({ searchTerm: e.target.value }));
    }
  };

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        //   debouncedSearch(event);
      }}
      onKeyDown={keyPress}
      focused
    />
  );
}
