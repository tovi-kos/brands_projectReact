import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, Alert, Paper, Grid, OutlinedInput,Autocomplete, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { httpGetUserById, httpUpdateUserById, httpUpdateUserPassword } from "../api/userService.js";
import { useSelector, useDispatch } from "react-redux";
import { userUpdate } from "../features/userSlice.js";
import { useNavigate } from "react-router-dom";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";

const EditUserProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors }, watch, setError, clearErrors } = useForm();
  const currentUser = useSelector((st) => st.user.currentUser);
  const { _id, token } = currentUser || {};
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");

  const domains = ["gmail.com", "outlook.com", "org.il"];

  useEffect(() => {
    if (_id && token) {
      httpGetUserById(_id, token)
        .then((res) => {
          setValue("userName", res.data.userName);
          setValue("mail", res.data.mail);
        })
        .catch(() => setError("error", { message: "Failed to fetch user data" }));
    }
  }, [_id, token, setValue, setError]);

  const save = async (data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      console.error("Passwords do not match");
      return;
    } else {
      clearErrors("confirmPassword");
    }
    
    try {
      await httpUpdateUserById(_id, data, token);
      dispatch(userUpdate(data.userName));
      console.log("Profile updated successfully");
      
      if (data.newPassword) {
        await httpUpdateUserPassword(_id, { password: data.newPassword }, token);
        console.log("Password updated successfully");
      }
      
      setValue("success", "Profile and password updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update profile or password", error);
      setError("error", { message: "Failed to update profile or password" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt:0, p: 4, borderRadius: 2, backgroundColor: "white" }}>
        <AccountCircleIcon sx={{ fontSize: 80, color: "black", mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          Edit Profile
        </Typography>
        {errors.error && <Alert severity="error" sx={{ mb: 2 }}>{errors.error.message}</Alert>}
        {errors.success && <Alert severity="success" sx={{ mb: 2 }}>{errors.success.message}</Alert>}
        
        <form onSubmit={handleSubmit(save)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="caption">UserName</Typography>
        
          <TextField
            id="userName"
            variant="outlined"
            fullWidth
            type="text"
            {...register('userName', {
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long'
              }
            })}
            error={!!errors.userName}
            helperText={errors.userName ? errors.userName.message : ''}
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7d80b3"
              }
            }}
          />
        
            </Grid>

            <Grid item xs={12}>
            <Typography variant="caption">Mail</Typography>
        <Autocomplete
          freeSolo
          options={email.includes("@") ? domains.map(domain => email.split("@")[0] + "@" + domain) : []}
          onInputChange={(event, newValue) => setEmail(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              type="email"
              {...register('mail', {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.mail}
              helperText={errors.mail ? errors.mail.message : ''}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7d80b3"
                }
              }}
              disableClearable // לא יופיע ה-X כדי לנקות את השדה
              clearOnEscape
            />
          )}
        />

            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">New Password </Typography>
              <OutlinedInput
                fullWidth
                type={showPassword ? "text" : "password"}
                {...register("newPassword")}
                sx={{
                  mb: 1,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7d80b3" }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ?<PiEyeLight /> :<PiEyeClosedLight /> }
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="caption">Confirm Password </Typography>
              <OutlinedInput
                fullWidth
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                sx={{
                  mb: 3,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7d80b3" }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <PiEyeLight /> :<PiEyeClosedLight /> }
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.confirmPassword && (
                <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                maxWidth: "50%",
                backgroundColor: "black",
                color: "white",
                '&:hover': { backgroundColor: "white", color: "black", border: "2px solid black" },
              }}
            >
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EditUserProfile;
