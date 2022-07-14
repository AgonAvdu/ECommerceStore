import * as yup from "yup";

export const validationSchema = [
  yup.object({
    FullName: yup.string().required("Full name is required"),
    Address1: yup.string().required("Address line 1 is required"),
    City: yup.string().required("City is required"),
    Country: yup.string().required("Country is required"),
    Zip: yup.string().required("ZIP code is required"),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required("Name on card is required"),
  }),
];
