import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          User Management Dashboard
        </Typography>

        <Typography variant="body2">JSONPlaceholder API</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
