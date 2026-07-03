import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

const FilterDialog = ({ open, onClose, filters, setFilters }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Filters</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="First Name"
              value={filters.firstName}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  firstName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Last Name"
              value={filters.lastName}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  lastName: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Email"
              value={filters.email}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  email: e.target.value,
                })
              }
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              label="Department"
              value={filters.department}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  department: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
