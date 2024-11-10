import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useProfiles } from "../../context/ProfileContext";

const Navbar = () => {
  const { profiles } = useProfiles();
  const lastProfile =
    profiles.length > 0 ? profiles[profiles.length - 1] : null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Profile Management Application
          </Typography>
          {lastProfile && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              {lastProfile.firstName} {lastProfile.lastName}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
