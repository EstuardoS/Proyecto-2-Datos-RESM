import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './Filters.css';

const optionsOrder = [
  { label: 'Name A-Z', value: 'name' },
  { label: 'Name Z-A', value: '-name' },
  { label: 'Price Low to High', value: 'price' },
  { label: 'Price High to Low', value: '-price' },
];

export default function Filters({ setOrder, setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        const categoriesFormatted = data.map(category => ({
          label: category.name,
          value: category.id,
        }));
        setCategories(categoriesFormatted);
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  return (
    <div id='filters-container'>
      <Autocomplete
        disablePortal
        options={optionsOrder}
        onChange={(event, newValue) => {
          setOrder(newValue?.value || '');
        }}
        sx={{
          width: 300,
          bgcolor: "black",
          color: "white",
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" }
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiPaper-root": {
            bgcolor: "black",
            color: "white",
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Order type" variant="outlined" />
        )}
      />

      <Autocomplete
        disablePortal
        options={categories}
        onChange={(event, newValue) => {
          setCategory(newValue?.value || '');
        }}
        sx={{
          width: 300,
          bgcolor: "black",
          color: "white",
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": { borderColor: "gray" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" }
          },
          "& .MuiInputLabel-root": {
            color: "gray",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& .MuiPaper-root": {
            bgcolor: "black",
            color: "white",
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Category" variant="outlined" />
        )}
      />
    </div>
  );
}
