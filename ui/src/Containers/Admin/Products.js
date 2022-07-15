import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Container,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useProducts from "../../hooks/useProducts";
import AppPagination from "../../components/Pagination/AppPagination";
import {
  setPageNumber,
  deleteProduct,
  getProductsStatus,
} from "../../store/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { variables } from "../../hoc/Variables";
import { useState } from "react";
import ProductForm from "../../components/Product/ProductForm/ProductForm";

export default function Inventory() {
  const dispatch = useDispatch();
  const { products, metaData } = useProducts();
  const loading = useSelector(getProductsStatus);
  // const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const [editMode, setEditMode] = useState(false);
  console.log(editMode);

  const [selectedProduct, setSelectedProduct] = useState(undefined);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setEditMode(true);
  }

  async function handleDeleteProduct(id) {
    setTarget(id);
    dispatch(deleteProduct(id));
  }

  function cancelEdit() {
    if (selectedProduct) setSelectedProduct(undefined);
    setEditMode(false);
  }

  if (editMode) {
    return <ProductForm product={selectedProduct} cancelEdit={cancelEdit} />;
  }
  return (
    <Container>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Inventory
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">
                  <Box display="flex" alignItems="center">
                    <img
                      src={`${variables.PHOTO_URL}/${product.imgUrl} `}
                      alt={product.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{product.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                <TableCell align="center">{product.type}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.quantityInStock}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleSelectProduct(product)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={target === product.id && loading === "loading"}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </Container>
  );
}
