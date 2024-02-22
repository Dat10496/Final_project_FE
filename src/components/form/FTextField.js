import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";




function FTextField({
  name,
  border,
  borderHover,
  borderFocus,
  labelColor,
  textColor,
  ...other
}) {
  const { control } = useFormContext();

  const styles = {
    textField: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: border, //Set the Input border
        },
        "&:hover fieldset": {
          borderColor: borderHover, // - Set the Input border when parent has :hover
        },
        "&.Mui-focused fieldset": {
          // - Set the Input border when parent is focused
          borderColor: borderFocus,
        },
        color: textColor || "info.main",
      },
    },
    inputLabel: {
      style: { color: labelColor },
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          variant="outlined"
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          sx={styles.textField}
          InputLabelProps={styles.inputLabel}
          InputProps={{
            input: {
              color: "red",
            },
          }}
        />
      )}
    />
  );
}

export default FTextField;
