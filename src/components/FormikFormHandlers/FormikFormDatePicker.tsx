import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useField } from "formik";
import { IFormikDateProps } from "../../core/interface/IFormikDateProps";
import FormikFormErrorHandler from "./FormikFormErrorHandler";
const FormikFormDatePicker = (props: IFormikDateProps) => {
  const { id, label, format = "DD/MM/YYYY" } = props;
  const [field, meta, helpers] = useField(props);
  const value = field.value ? dayjs(field.value) : null;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          {...field}
          {...props}
          label={label}
          format={format}
          value={value}
          onChange={(date) => helpers.setValue(date)}
        />
      </LocalizationProvider>
      <FormikFormErrorHandler meta={meta} id={`${id}_form_error`} />
    </>
  );
};

export default FormikFormDatePicker;
