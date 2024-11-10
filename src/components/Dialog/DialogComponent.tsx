import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { ICustomDialogueProps } from "../../core/interface/ICustomDialogueProps";
const DialogComponent = (props: ICustomDialogueProps) => {
  const {
    open,
    scroll = "body",
    id,
    children,
    modalTitle,
    handleClose,
    ...rest
  } = props;
  return (
    <Dialog
      onClose={handleClose}
      id={id + `_dialog`}
      aria-labelledby="customized-dialog-title"
      open={open}
      scroll={scroll}
      {...rest}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id={id + `_dialog_title`}>
        {modalTitle}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        id={id + `_dialog_btn`}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default DialogComponent;
