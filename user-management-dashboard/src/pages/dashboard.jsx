import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { deleteUser as deleteApi } from "../api/userService";
import FilterDialog from "../components/FilterDialog";
import ConfirmDelete from "../components/ConfirmDelete";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
} from "@mui/material";

import { addUser, updateUser } from "../api/userService";

import { toast } from "react-toastify";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";

import { getUsers } from "../api/userService";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteUser, setDeleteUser] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const data = await getUsers();

      setUsers(data);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddClick = () => {
    setSelectedUser(null);
    setOpenForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, data);

        setUsers((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  name: `${data.firstName} ${data.lastName}`,
                  email: data.email,
                  company: { name: data.department },
                }
              : user,
          ),
        );

        toast.success("User updated successfully");
      } else {
        const newUser = await addUser(data);

        const userToAdd = {
          id: users.length + 1,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          company: {
            name: data.department,
          },
        };

        setUsers((prev) => [...prev, userToAdd]);

        toast.success("User added successfully");
      }

      setOpenForm(false);
    } catch (error) {
      toast.error("Operation failed");
    }
  };
  const handleDeleteClick = (user) => {
    setDeleteUser(user);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteApi(deleteUser.id);

      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));

      toast.success("User deleted");

      setDeleteOpen(false);
    } catch {
      toast.error("Delete failed");
    }
  };
  let filteredUsers = [...users];

  filteredUsers = filteredUsers.filter((user) => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  filteredUsers = filteredUsers.filter((user) => {
    const names = user.name.split(" ");

    return (
      names[0].toLowerCase().includes(filters.firstName.toLowerCase()) &&
      names
        .slice(1)
        .join(" ")
        .toLowerCase()
        .includes(filters.lastName.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.company.name.toLowerCase().includes(filters.department.toLowerCase())
    );
  });

  if (sort === "asc") {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === "desc") {
    filteredUsers.sort((a, b) => b.name.localeCompare(a.name));
  }

  const start = (page - 1) * rowsPerPage;

  const paginatedUsers = filteredUsers.slice(start, start + rowsPerPage);

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <SearchBar search={search} setSearch={setSearch} />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Select
              fullWidth
              value={sort}
              displayEmpty
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="">Sort By</MenuItem>

              <MenuItem value="asc">Name A-Z</MenuItem>

              <MenuItem value="desc">Name Z-A</MenuItem>
            </Select>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Button
              variant="outlined"
              startIcon={<FilterAltIcon />}
              onClick={() => setFilterOpen(true)}
            >
              Filter
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add User
            </Button>
          </Grid>
        </Grid>

        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 2,
            borderRadius: 3,
          }}
        >
          <UserTable
            users={paginatedUsers}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </Paper>

        <Box
          mt={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControl sx={{ width: 120 }}>
            <InputLabel>Rows</InputLabel>

            <Select
              value={rowsPerPage}
              label="Rows"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>

          <Pagination
            page={page}
            count={Math.ceil(filteredUsers.length / rowsPerPage)}
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Container>
      <UserForm
        open={openForm}
        handleClose={handleClose}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />

      <FilterDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <ConfirmDelete
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default Dashboard;
