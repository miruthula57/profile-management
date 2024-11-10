import { Delete, Edit } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/Button/ButtonComponent";
import DialogComponent from "../../components/Dialog/DialogComponent";
import { useProfiles } from "../../context/ProfileContext";
import NoDataFound from "../NoDataFound/NoDataFound";

const ProfileList = () => {
  const navigate = useNavigate();
  const { profiles, deleteProfileById } = useProfiles();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    null
  );

  const handleDeleteClick = (id: string) => {
    setSelectedProfileId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProfileId) {
      deleteProfileById(selectedProfileId);
    }
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleClick = () => {
    navigate("/profile-form");
  };

  const handleEdit = useCallback((id: string) => {
    navigate("/profile-form", {
      state: { updatedValues: id },
    });
  }, [navigate]);

  const profileRows = useMemo(() => {
    return profiles.length === 0 ? (
      <TableRow>
        <TableCell colSpan={6} align="center">
          <NoDataFound />
        </TableCell>
      </TableRow>
    ) : (
      profiles.map((profile, index) => (
        <TableRow key={profile.id}>
          <TableCell>
            <Typography variant="subtitle1">{index + 1}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="subtitle1">
              {profile.firstName} {profile.lastName}
            </Typography>
          </TableCell>
          <TableCell>{profile.age || "--"}</TableCell>
          <TableCell>{profile.email}</TableCell>
          <TableCell>{profile.dob || "--"}</TableCell>
          <TableCell>
            <Tooltip title="Edit">
              <IconButton
                sx={{ color: "blue" }}
                onClick={() => handleEdit(profile.id)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                sx={{ color: "red" }}
                onClick={() => handleDeleteClick(profile.id)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>
      ))
    );
  }, [profiles,handleEdit]);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" width="100%">
        <ButtonComponent
          label="ADD"
          id="add_Profile_btn"
          color="primary"
          endIcon={<AddIcon />}
          onClick={handleClick}
          sx={{ m: 2 }}
        />
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12} p={1}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Profile List</Typography>}
            />
            <CardContent>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>#</b>
                      </TableCell>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Age</b>
                      </TableCell>
                      <TableCell>
                        <b>Email</b>
                      </TableCell>
                      <TableCell>
                        <b>DOB</b>
                      </TableCell>
                      <TableCell>
                        <b>Action</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{profileRows}</TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <DialogComponent
        open={openDialog}
        modalTitle="Confirm Deletion"
        handleClose={handleCancelDelete}
        id={""}
        sx={{
          "& .MuiDialog-paper": { width: "35%", maxWidth: "none" },
          "& .MuiDialogTitle-root": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1976d2",
            padding: "4px 16px",
            height: "40px",
            fontSize: 16,
          },
          "& .MuiDialogTitle-root .MuiTypography-root": {
            flexGrow: 1,
            textAlign: "center",
          },
          "& .MuiSvgIcon-root": {
            userSelect: "none",
            display: "inline-block",
            fill: "currentColor",
            flexShrink: 0,
            transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            fontSize: "1.5rem",
            position: "relative",
            top: "-0.28em",
            left: "0.1em",
            color: "black",
          },
        }}
        hideBackdrop={false}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            setOpenDialog(false);
          }
        }}
      >
        <Typography variant="body1" p={1} m={1}>
          Are you sure you want to delete this profile?
        </Typography>
        <Grid container justifyContent="flex-end" spacing={2} p={2}>
          <Grid item>
            <ButtonComponent
              type="button"
              variant="contained"
              onClick={handleConfirmDelete}
              color="primary"
              size="small"
              id="btn_Yes_submit"
              label="Yes"
            />
          </Grid>
          <Grid item>
            <ButtonComponent
              type="button"
              variant="contained"
              onClick={handleCancelDelete}
              color="inherit"
              form="AddEditForm"
              size="small"
              id="btn_No_submit"
              label="No"
            />
          </Grid>
        </Grid>
      </DialogComponent>
    </>
  );
};

export default ProfileList;
