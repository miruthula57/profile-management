import { Button } from "@mui/material";
import { ICustomButtonProps } from "../../core/interface/ICustomButtonProps";

const ButtonComponent = (props: ICustomButtonProps) => {
  const {
    color,
    variant = "contained",
    label,
    size = "small",
    id,
    children,
    ...rest
  } = props;

  return (
    <Button
      variant={variant}
      size={size}
      color={color || "inherit"}
      id={id + `_button`}
      {...rest}
    >
      <span id={id + `_button_label`}>{label}</span>
      {children}
    </Button>
  );
};

export default ButtonComponent;
