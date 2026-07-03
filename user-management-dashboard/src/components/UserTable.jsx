import {
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UserTable = ({ users, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return (
      <CircularProgress
        sx={{
          display: "block",
          margin: "40px auto",
        }}
      />
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead
          sx={{
            backgroundColor: "#1976d2",
          }}
        >
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              ID
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              First Name
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Last Name
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Department
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Users Found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => {
              const names = user.name.split(" ");

              return (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>

                  <TableCell>{names[0]}</TableCell>

                  <TableCell>{names.slice(1).join(" ")}</TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>{user.company?.name}</TableCell>

                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => onEdit(user)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => onDelete(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
