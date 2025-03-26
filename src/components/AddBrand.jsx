import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Button, MenuItem, Select, FormControl, Typography, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { httpAddBrand } from "../api/brandService.js"; 
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

const AddProduct = () => {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  let currentUser = useSelector(st => st.user.currentUser);
  let navigate = useNavigate();


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      clearErrors("image"); // מסיר את השגיאה אם נבחרה תמונה
    }
  };

  const save = (data) => {
    if (!selectedFile) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }

    // שליחת הנתונים לשרת
    httpAddBrand({...data,srcImg:selectedFile.name,file:selectedFile}, currentUser?.token)
      .then(() => {
        console.log(data.gender);
        // ניווט לעמוד המוצרים עם סינון לפי הגזע של המותג החדש
        navigate(`/allBrands?gender=${data.gender}`);
      })
      .catch(err => console.log("Error with adding a brand: ", err));
  };

  return (
    <Box sx={{ width: "100%", padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" marginBottom={3}>
        Add a New Brand
      </Typography>
      <form onSubmit={handleSubmit(save)}>
  <Grid container spacing={3}>
    {/* טור שמאלי */}
    <Grid item xs={12} md={4}>
      <Typography variant="caption">Brand Name</Typography>
      <TextField
        fullWidth
        variant="outlined"
        {...register("nameBrand", {
          required: "Brand Name is required",
          minLength: { value: 3, message: "Brand Name must be at least 3 characters long" }
        })}
        error={!!errors.nameBrand}
        helperText={errors.nameBrand?.message || ""}
        sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }}}
      />

      <Typography variant="caption">Model Name</Typography>
      <TextField
        fullWidth
        variant="outlined"
        {...register("modelBrand", {
          required: "Model Name is required",
          minLength: { value: 3, message: "Model Name must be at least 3 characters long" }
        })}
        error={!!errors.modelBrand}
        helperText={errors.modelBrand?.message || ""}
        sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }}}
      />

      <Typography variant="caption">Price</Typography>
      <TextField
        fullWidth
        variant="outlined"
        {...register("price", {
          required: "Price is required",
          pattern: { value: /^[1-9][0-9]{0,4}$/, message: "Price must be a positive number (1-5 digits)" }
        })}
        error={!!errors.price}
        helperText={errors.price?.message || ""}
        sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }}}
      />

      <Typography variant="caption">Gender</Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          defaultValue=""
          {...register("gender", { required: "Gender is required" })}
          error={!!errors.gender}
        >
          <MenuItem value="Men">Men</MenuItem>
          <MenuItem value="Women">Women</MenuItem>
          <MenuItem value="Kids">Kids</MenuItem>
          <MenuItem value="Accessories">Accessories</MenuItem>
          <MenuItem value="Shoes">Shoes</MenuItem>
        </Select>
        {errors.gender && <Typography color="error">{errors.gender.message}</Typography>}
      </FormControl>
    </Grid>

    {/* טור אמצעי */}
    <Grid item xs={12} md={4}>
      <Typography variant="caption">Category</Typography>
      <TextField
        fullWidth
        variant="outlined"
        {...register("category", {
          required: "Category is required",
          minLength: { value: 3, message: "Category must be at least 3 characters long" }
        })}
        error={!!errors.category}
        helperText={errors.category?.message || ""}
        sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }}}
      />

      <Typography variant="caption">Size</Typography>
      <TextField
        fullWidth
        variant="outlined"
        {...register("size", { required: "Size is required" })}
        error={!!errors.size}
        helperText={errors.size?.message || ""}
        sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }}}
      />

      {/* העלאת תמונה */}
      <label htmlFor="image-upload">
        <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} />
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "white", color: "black", border: "2px solid black" },
          }}
        >
          Upload Image
        </Button>
      </label>

      {errors.image && <Typography color="error" sx={{ mt: 1 }}>{errors.image.message}</Typography>}
    </Grid>

    {/* טור ימני (תמונה) */}
    <Grid item xs={12} md={4}>
      {imagePreview && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "250px", borderRadius: 4 }} />
        </Box>
      )}
    </Grid>
  </Grid>

  {/* כפתור שליחה */}
  <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        maxWidth: "33%", // מכסה רק את עמודה אחת
        backgroundColor: "black",
        color: "white",
        "&:hover": { backgroundColor: "white", color: "black", border: "2px solid black" }, 
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#7d80b3"
        }
      }}
    >
      Add Brand
    </Button>
  </Box>
</form>
    </Box>
  );
};

export default AddProduct;
