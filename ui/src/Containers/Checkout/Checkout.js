import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm.js";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FormProvider, useForm } from "react-hook-form";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./checkoutValidation.js";
import { ORDER_URL, ACCOUNT_URL } from "../../hoc/Variables.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../../store/cartSlice";
import { LoadingButton } from "@mui/lab";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardNumberElement } from "@stripe/react-stripe-js";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const currentValidationSchema = validationSchema[activeStep];
  const [cardState, setCardState] = useState({ elementError: {} });
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const cart = useSelector(getCart);

  const stripe = useStripe();
  const elements = useElements();

  function onCardInputChange(event) {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm
            cardState={cardState}
            onCardInputChange={onCardInputChange}
          />
        );

      default:
        throw new Error("Unknown step");
    }
  }

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  useEffect(() => {
    axios.get(ACCOUNT_URL + "/savedAddress").then((response) => {
      const { Id, ...responseData } = response.data;
      console.log(responseData);
      if (responseData) {
        methods.reset({
          ...methods.getValues(),
          ...responseData,
          saveAddress: false,
        });
      }
    });
  }, [methods]);

  async function submitOrder(data) {
    setLoading(true);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (!stripe || !elements) return;
    try {
      const cardElement = elements.getElement(CardNumberElement);
      console.log(cardElement, nameOnCard);
      const paymentResult = await stripe.confirmCardPayment(
        cart?.ClientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: nameOnCard,
            },
          },
        }
      );
      console.log(paymentResult);

      if (paymentResult.paymentIntent?.status === "succeeded") {
        const orderNumber = await axios.post(ORDER_URL, {
          saveAddress,
          shippingAddress,
        });
        console.log(orderNumber.data);
        setOrderNumber(orderNumber.data);
        setPaymentSuccess(true);
        setPaymentMessage("Your payment in complete");
        setActiveStep(activeStep + 1);
        dispatch(clearCart());
        setLoading(false);
      } else {
        setPaymentMessage(paymentResult.error?.message);
        setPaymentSuccess(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleNext = async (data) => {
    if (activeStep === steps.length - 1) {
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function submitDisabled() {
    if (activeStep === steps.length - 1) {
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
  }

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    {paymentMessage}
                  </Typography>

                  {paymentSuccess ? (
                    <Typography variant="subtitle1">
                      Your order number is #{orderNumber}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                  ) : (
                    <Button variant="contained" onClick={handleBack}>
                      Go back and try again
                    </Button>
                  )}
                </>
              ) : (
                <form onSubmit={methods.handleSubmit(handleNext)}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <LoadingButton
                      loading={loading}
                      disabled={submitDisabled()}
                      variant="contained"
                      type="submit"
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </LoadingButton>
                  </Box>
                </form>
              )}
            </>
          </Paper>
        </Container>
      </FormProvider>
    </ThemeProvider>
  );
}
