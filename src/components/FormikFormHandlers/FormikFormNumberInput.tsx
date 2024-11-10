import { TextField } from "@mui/material";
import { useField } from "formik";
import { IFormikNumberProps } from "../../core/interface/IFormikNumberProps";
import FormikFormErrorHandler from "./FormikFormErrorHandler";

const FormikFormNumberInput = (props: IFormikNumberProps) => {
  const id = props.id;
  const [field, meta, helpers] = useField(props);
  const _placeholder = props.placeholder;
  return (
    <>
      <TextField
        {...field}
        {...props}
        placeholder={_placeholder}
        className={props.className}
        disabled={props.disabled}
        type="number"
        value={field.value === -999 ? "" : field.value}
        onKeyDown={(e) => {
          if (props.isnegativeallowed) {
            (e.key === "E" ||
              e.key === "+" ||
              e.key === "e" ||
              e.key === ".") &&
              e.preventDefault();
          } else if (props.isnegativeanddotallowed) {
            (e.key === "E" || e.key === "+" || e.key === "e") &&
              e.preventDefault();
          } else
            (e.key === "E" ||
              e.key === "+" ||
              e.key === "e" ||
              e.key === "." ||
              e.key === "-") &&
              e.preventDefault();
        }}
        onChange={(event) => {
          if (event.target.value.length > props.maxLength)
            event.target.value = event.target.value.slice(0, props.maxLength);
          helpers.setValue(
            isNaN(parseFloat(event.target.value))
              ? -999
              : parseFloat(event.target.value)
          );
        }}
      />
      <FormikFormErrorHandler meta={meta} id={id + `_form_error`} />
    </>
  );
};

export default FormikFormNumberInput;
