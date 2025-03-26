import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Button, MenuItem, Select, FormControl, Typography, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { httpUpdateBrandById, httpGetBrandById } from "../api/brandService.js";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { renderUrl } from "../../basicUrl.js";


const Input = styled("input")({
  display: "none",
});
const BrandUpdate = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [gender, setGender] = useState(""); 
  let currentUser = useSelector(state => state.user.currentUser);
let navigate=useNavigate();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    httpGetBrandById(id)
      .then((res) => {
        const brandData = res.data;
        setValue("nameBrand", brandData.nameBrand);
        setValue("modelBrand", brandData.modelBrand);
        setValue("price", brandData.price);
        setValue("category", brandData.category);
        setValue("size", brandData.size);
        setValue("gender", brandData.gender);
        setGender(brandData.gender);
        if (brandData.srcImg) {
          setImagePreview(`${renderUrl}/${brandData.srcImg}`); // מציג את התמונה הקיימת
        }
      })
      .catch(err => console.log("Error fetching product details: ", err));

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [id, setValue]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // מציג תצוגה מקדימה של התמונה החדשה
    }
  };

  const update = (data) => {


    // const formData = new FormData();
    // Object.keys(data).forEach(key => formData.append(key, data[key]));

    // if (selectedFile) {
    //   formData.append("srcImg", selectedFile); // מוסיף את התמונה אם הועלתה חדשה
    // }

    // SweetAlert confirmation dialog
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: false, // ביטול כפתור
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
      confirmButtonColor: "#000", // צבע הכפתור Save יהיה שחור
      denyButtonColor: "#d33",  // צבע הכפתור Don't Save יהיה אדום
    }).then((result) => {
      if (result.isConfirmed) {
        // עדכון המותג
        httpUpdateBrandById(id, {...data,srcImg:selectedFile?.name,file:selectedFile}, currentUser?.token)
          .then((res) => {
            console.log(res);
            Swal.fire( { title: "Saved!",
            text: "Your changes have been saved successfully.",
            icon: "success",
            confirmButtonColor: '#4CAF50'}); 
          
          })
         
          .catch(err => console.log("Error updating brand: ", err));
      } 
      navigate(-1); 
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "64px",
        left: 0,
        width: "100vw",
        height: "calc(100vh - 64px)",
        backgroundColor: "white",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" textAlign="center" marginBottom={3}>
        Update a Brand
      </Typography>

      <form onSubmit={handleSubmit(update)} style={{ width: "80%" }}>
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
              }}}           />

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
              }}}            />

            <Typography variant="caption">Size</Typography>
            <TextField
              fullWidth
              variant="outlined"
              {...register("size", { required: "Size is required" })}
              error={!!errors.size}
              helperText={errors.size?.message || ""}
              sx={{ mb: 2 , "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7d80b3"
              }}}            />

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
          </Grid>

          {/* טור ימני (תמונה) */}
          <Grid item xs={12} md={4}>
            {imagePreview && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img src={imagePreview} alt="Preview" 
                style={{ width: "100%", maxHeight: "250px", borderRadius: 4 }} />
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
              maxWidth: "33%", 
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "white", color: "black", border: "2px solid black" },
            }}
          >
            Update Brand
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default BrandUpdate;