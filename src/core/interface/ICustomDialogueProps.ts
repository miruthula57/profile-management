import { DialogProps } from "@mui/material/Dialog";

export interface ICustomDialogueProps extends DialogProps {
    open: boolean;
    modalTitle?: string | any;
    handleClose: (data: any) => void;
    id: string;
}