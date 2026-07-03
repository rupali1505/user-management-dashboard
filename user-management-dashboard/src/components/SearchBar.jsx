import { TextField } from "@mui/material";

const SearchBar = ({ search, setSearch }) => {
  return (
    <TextField
      label="Search Users"
      variant="outlined"
      fullWidth
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
