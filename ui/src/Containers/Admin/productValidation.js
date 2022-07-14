import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().moreThan(0),
  sale: yup.number().required().max(100),
  category: yup.number().required(),
  quantityInStock: yup.number().required().min(0),
  file: yup.mixed().when("imgUrl", {
    is: (value) => !value,
    then: yup.mixed().required("Please provide an image"),
  }),
});
