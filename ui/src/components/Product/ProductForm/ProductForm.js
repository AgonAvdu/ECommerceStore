import { Typography, Grid, Paper, Box, Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useProducts from "../../../hooks/useProducts";
import AppDropZone from "../../Inputs/AppDropZone/AppDropZone";
import AppSelectList from "../../Inputs/AppSelectList/AppSelectList";
import AppTextInput from "../../Inputs/AppTextInput/AppTextInput";
import { variables } from "../../../hoc/Variables";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../../Containers/Admin/productValidation";
import { useDispatch } from "react-redux";
import { editProduct, createProduct } from "../../../store/productsSlice";
import { LoadingButton } from "@mui/lab";

export default function ProductForm({ product, cancelEdit }) {
  const dispatch = useDispatch();

  // const {
  //   control,
  //   reset,
  //   handleSubmit,
  //   watch,
  //   formState: { isDirty, isSubmitting },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  // });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const { availableCategories } = useProducts();
  const watchFile = watch("file", null);

  useEffect(() => {
    if (product && !watchFile && !isDirty) reset(product);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [product, reset, watchFile, isDirty]);

  const handleSubmitData = (data) => {
    console.log("clicked");
    if (product) {
      console.log("edit");
      dispatch(editProduct(data));
    } else {
      console.log("create");
      dispatch(createProduct(data));
    }
    cancelEdit();
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Box component={Paper} sx={{ p: 4, backgroundColor: "primary.main" }}>
        <Typography color="white" variant="h4" gutterBottom sx={{ mb: 4 }}>
          Product Details
        </Typography>
        <form
          onSubmit={handleSubmit((data) => {
            console.log("clicked");
            if (product) {
              console.log("edit");
              dispatch(editProduct(data));
            } else {
              console.log("create");
              dispatch(createProduct(data));
            }
            cancelEdit();
          })}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AppDropZone control={control} name="file" />
                {watchFile ? (
                  <img
                    src={watchFile.preview}
                    alt="preview"
                    style={{ maxHeight: 200 }}
                  />
                ) : (
                  <img
                    src={`${variables.PHOTO_URL}${product?.imgUrl} `}
                    alt={product?.name}
                    style={{ maxHeight: 200 }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <AppTextInput
                control={control}
                name="name"
                label="Product name"
              />
            </Grid>
            <Grid item xs={12}>
              <AppTextInput
                multiline={true}
                rows={4}
                control={control}
                name="description"
                label="Description"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                type="number"
                control={control}
                name="price"
                label="Price"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppTextInput
                type="number"
                control={control}
                name="sale"
                label="Sale"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppSelectList
                items={availableCategories}
                control={control}
                name="categoryId"
                label="Category"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <AppTextInput
                control={control}
                type="number"
                name="quantityInStock"
                label="Quantity in Stock"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button onClick={cancelEdit} variant="contained" color="inherit">
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              variant="contained"
              color="secondary"
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
