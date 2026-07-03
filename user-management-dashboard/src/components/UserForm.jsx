import { useEffect, useState } from "react";

import { Button, Container, Grid, MenuItem, Select } from "@mui/material";

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

          <Grid size={{ xs: 6, md: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<FilterAltIcon />}>
              Filter
            </Button>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Button fullWidth variant="contained" startIcon={<AddIcon />}>
              Add User
            </Button>
          </Grid>
        </Grid>

        <UserTable
          users={users}
          loading={loading}
          error={error}
          onEdit={(user) => console.log(user)}
          onDelete={(user) => console.log(user)}
        />
      </Container>
    </>
  );
};

export default Dashboard;
