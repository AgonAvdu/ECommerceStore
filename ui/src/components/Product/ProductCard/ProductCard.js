import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { variables } from "../../../hoc/Variables";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCartStatus } from "../../../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartStatus = useSelector(getCartStatus);

  const handleAddItem = (productId) => {
    dispatch(addItemToCart(productId)).catch((error) => console.log(error));
  };

  return (
    <Card
      sx={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "primary.dark",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.light", color: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "white" },
        }}
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "white",
          borderBottom: "1px solid",
          borderTop: "0.1rem solid",
        }}
        image={`${variables.PHOTO_URL}/${product.imgUrl} `}
        // src={variables.PHOTO_URL + product.imgUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="white" variant="h5">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="white">
          {product.categoryId}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={cartStatus === "loading"}
          onClick={() => handleAddItem(product.id)}
          sx={{ color: "white" }}
          size="small"
        >
          Add to cart
        </LoadingButton>
        <Button
          sx={{ color: "white" }}
          component={Link}
          to={`/gallery/${product.id}`}
          size="small"
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
