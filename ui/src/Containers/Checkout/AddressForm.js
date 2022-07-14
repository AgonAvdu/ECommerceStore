import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../components/Inputs/AppTextInput/AppTextInput";
import AppCheckBox from "../../components/Inputs/AppCheckBox/AppCheckBox";
export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="FullName" label="Full Name" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name="Address1" label="Address 1" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput control={control} name="Address2" label="Address 2" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="City" label="City" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="Zip" label="Zip" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput control={control} name="Country" label="Country" />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Save this as default address"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}
