import { useForm } from "react-hook-form";
import { httpAddUser } from "../api/userService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userIn } from "../features/userSlice";
import { useState } from "react";

// MUI imports
import { InputAdornment, TextField, Box, Button, Typography, Divider, styled, IconButton, OutlinedInput, Autocomplete, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { openDrawer } from "../features/drawerSlice";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";



function SignUp() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const domains = ["gmail.com", "outlook.com", "org.il"];


  function save(data) {
    httpAddUser(data).then(res => {
      alert("User sign-up successful");
      dispatch(userIn(res.data));
      navigate("/home");
    }).catch(err => {
      console.log("Error with sign-up: ", err);
    });
  }

  let { register, handleSubmit, formState: { errors } } = useForm();

  // Styled divider for custom spacing
  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  return (

    <Box
      sx={{
        width: 450,
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // מיישר את כל התוכן לשמאל
        marginLeft: "auto", // מציב את הקונטיינר בצד השמאלי
        marginRight: "auto", // כדי לשמור על איזון ושהקונטיינר לא יתפשט 
      }}
      role="presentation"
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 2, textAlign: "left", width: "100%", mt: -4 }}
      >
        Create an Account
      </Typography>
      <Typography
        variant="body2"
        sx={{ marginBottom: 4, textAlign: "left", width: "100%" }}
      >
        Fill in your details to sign up and get started.
      </Typography>

      <form onSubmit={handleSubmit(save)} style={{ width: "100%" }}>
        <Typography variant="caption">UserName</Typography>
        <div>
          <TextField
            id="userName"
            variant="outlined"
            fullWidth
            type="text"
            {...register('userName', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long'
              }
            })}
            error={!!errors.userName}
            helperText={errors.userName ? errors.userName.message : ''}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7d80b3"
              }
            }}
          />
        </div>

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
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!errors.mail}
              helperText={errors.mail ? errors.mail.message : ''}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7d80b3"
                }
              }}
              disableClearable // לא יופיע ה-X כדי לנקות את השדה
              clearOnEscape
            />
          )}
        />


        <Typography variant="caption">Password</Typography>
        <OutlinedInput
          id="password"
          variant="outlined"
          fullWidth
          type={showPassword ? "text" : "password"}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters long",
            }
          })}
          error={!!errors.password}
          sx={{
            mb: 3,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7d80b3" }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
                sx={{
                  color: showPassword ? '#7d80b3' : '',  // שינוי צבע לפי מצב
                  '&:hover': {
                    color: '#7d80b3', // שינוי צבע בעכבר על האיקון
                  },
                  backgroundColor: 'transparent',  // מסיר את הרקע
                  '&:hover': {
                    backgroundColor: 'transparent',  // מסיר את הרקע גם בהעברת עכבר
                  }
                }}
              >
               

                {showPassword ? <PiEyeLight /> :<PiEyeClosedLight />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && (
          <FormHelperText error sx={{ mb: 3, mt: -3 }}>
            {errors.password.message}
          </FormHelperText>
        )}



        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': { backgroundColor: "none" },
          }}
        >
          Sign Up
        </Button>
      </form>
      <Root sx={{ width: "100%", mt: 3 }}>
        <Divider>Already have an account? </Divider>
      </Root>

      <Button
        variant="outlined"
        onClick={() => dispatch(openDrawer())}
        fullWidth
        sx={{
          marginTop: 2,
          borderColor: 'black',
          color: 'black',
          backgroundColor: 'none',
          '&:hover': { borderColor: '#7d80b3', borderWidth: '1px', backgroundColor: "white" },
        }}
      >
        Log In
      </Button>
    </Box>

  );
}

export default SignUp;