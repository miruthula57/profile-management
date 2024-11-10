import { TextField } from "@mui/material";
import { useField } from "formik";
import { IFormikInputProps } from "../../core/interface/IFormikInputProps";
import FormikFormErrorHandler from "./FormikFormErrorHandler";

const FormikFormInput = (props: IFormikInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { id, validcharacter, invalidcharacter, onChange } = props;
  const _placeholder = props.placeholder;
  let subStrArr = [
    "?",
    ">",
    "<",
    "'",
    '"',
    ":",
    ";",
    ",",
    "+",
    "-",
    "(",
    ")",
    "*",
    "&",
    "^",
    "%",
    "$",
    "#",
    "{",
    "[",
    "]",
    "}",
    "|",
    "/",
    "=",
    "_",
    "~",
    "\\",
    "`",
  ];
  if (validcharacter)
    subStrArr = subStrArr.filter((el) => !validcharacter.includes(el));
  if (invalidcharacter) invalidcharacter.forEach((el) => subStrArr.push(el));

  const handleChange = (event: any) => {
    if (props.type === "tel") {
      !/[a-z]/i.exec(event.target.value) &&
        helpers.setValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
      return;
    }
    if (
      !props.spaceallowed &&
      (event.target.value === "" ||
        !subStrArr.some((subStr: any) => event.target.value.includes(subStr)))
    ) {
      event.target.value = event.target.value.replace(/ +(?= )/g, "");
      helpers.setValue(event.target.value);
    } else if (
      (props.spaceallowed === undefined || props.spaceallowed) &&
      (event.target.value === "" ||
        !subStrArr.some((subStr: any) => event.target.value.includes(subStr)))
    ) {
      helpers.setValue(event.target.value);
    }

    if (onChange) {
      onChange(event);
    }
  };
  return (
    <>
      <TextField
        {...field}
        {...props}
        placeholder={_placeholder}
        className={props.className}
        disabled={props.disabled}
        type={props.type ? props.type : "text"}
        onChange={handleChange}
      />
      <FormikFormErrorHandler meta={meta} id={id + `_form_error`} />
    </>
  );
};

export default FormikFormInput;
