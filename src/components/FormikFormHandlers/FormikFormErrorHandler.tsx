import { Typography } from "@mui/material";
import { IFormikErrorProps } from "../../core/interface/IFormikErrorProps";

const FormikFormErrorHandler = (props: IFormikErrorProps) => {
  const id = props.id;
  const _error = props.meta.error;
  return (
    <>
      {props.meta.touched &&
        ((props.meta.error && (
          <Typography id={id + `_text`} variant="body1" color="error">
            {_error}
          </Typography>
        )) ||
          (props.meta.warning && (
            <Typography
              id={id + `_text`}
              className="text-danger"
              variant="body1"
              color="error"
            >
              {" "}
              {props.meta.warning}{" "}
            </Typography>
          )))}
    </>
  );
};

export default FormikFormErrorHandler;
