import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

export default function RadioButton({ options, onChange, selectedValue }) {
  return (
    <RadioGroup onChange={onChange} value={selectedValue}>
      {options.map(({ value, label }) => (
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={label}
          key={value}
        />
      ))}
    </RadioGroup>
  );
}
