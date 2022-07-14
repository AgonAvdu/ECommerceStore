import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
export default function AppCheckBox(props) {
  const { field } = useController({ ...props, defaultValue: false });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...field}
          disabled={props.disabled}
          checked={field.value}
          color="secondary"
        />
      }
      label={props.label}
    />
  );
}
