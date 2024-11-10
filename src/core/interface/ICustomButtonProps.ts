import { ButtonProps } from "@mui/material/Button";

export interface ICustomButtonProps extends Omit<ButtonProps, "id"> {
    label: string;
    id: string
}