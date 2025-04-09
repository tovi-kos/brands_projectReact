import { PiEyeLight } from "react-icons/pi";
import { PiEyeClosedLight } from "react-icons/pi";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { httpLoginUser } from "../api/userService.js";
import { userIn } from "../features/userSlice.js";
import { closeDrawer } from "../features/drawerSlice.js";
import { useState } from "react";
// MUI
import React from "react";
import { TextField, Box, Drawer, Button, Typography, Divider, styled, IconButton, InputAdornment, OutlinedInput, FormHelperText, Autocomplete } from '@mui/material';
import { Visibility, VisibilityOff, GitHub, Google } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);     // מצב למעקב אחרי שגיאת התחברות
    const isOpen = useSelector((state) => state.drawer.isOpen);
    const [email, setEmail] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);

    const domains = ["gmail.com", "outlook.com", "org.il"];

    let dispatch = useDispatch();
    let navigate = useNavigate();

    /**
     * style to divider
     */
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        color: theme.palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));

    function save(data) {
        // אימות אם ה- reCAPTCHA הושלם
        if (!captchaToken) {
            alert("Please complete the reCAPTCHA verification.");
            return;
        }
        console.log("Attempting login with data:", { email: data.mail, password: data.password, captchaToken });

        httpLoginUser(data.mail, data.password, captchaToken).then(res => {
            console.log(res.data);
            // alert("User login successful");
            dispatch(userIn(res.data));
            dispatch(closeDrawer());
            setLoginError(false);
            navigate("/allBrands?gender=Men");
        }).catch(err => {
            console.error("Error with signIn", err);
            if (err.response) {
                // אם יש תשובה מהשרת
                console.log("Error response:", err.response);
                if (err.response.status === 401) {
                    setLoginError("Invalid email or password.");
                } else {
                    setLoginError("An unexpected error occurred. Please try again.");
                }
            } else {
                // אם אין תשובה מהשרת
                console.log("Network or other error:", err);
                setLoginError("Network error. Please check your connection.");
            }
        });
    }

    let { register, handleSubmit, formState: { errors }, setValue } = useForm();

    return (
        <div>
            <Drawer open={isOpen} onClose={() => { dispatch(closeDrawer()); setShowPassword(false) }} >
                <Box sx={{ width: 340, padding: 4 }} role="presentation" onClick={() => dispatch(closeDrawer())}>
                    <Typography variant="h5" sx={{ fontweight: "black", mb: 2, mt: 4 }}>Log in to your store account</Typography>
                    <Typography variant="body2" sx={{ fontweight: 100, mb: 4 }}>You can have a more personalized experience where you don't have to fill in your details every time.</Typography>
                    <form onSubmit={handleSubmit(save)} onClick={(e) => e.stopPropagation()}>
                        <Typography variant="caption">mail (userName)</Typography>
                        <div>
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
                                            "& .MuiOutlinedInput-root": {
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#7d80b3"
                                                }
                                            }
                                        }}
                                        disableClearable // לא יופיע ה-X כדי לנקות את השדה
                                        clearOnEscape
                                    />
                                )}
                            />
                        </div>
                        <Typography variant="caption">password</Typography>
                        <div>
                            <OutlinedInput
                                id="password"
                                variant="outlined"
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                {...register('password', {
                                    required: 'Password is required',

                                })}
                                error={!!errors.password}
                                sx={{
                                    mb: 3,
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#7d80b3" }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => { setShowPassword((show) => !show) }}
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
                                            {showPassword ? <PiEyeLight /> : <PiEyeClosedLight />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {errors.password && (
                                <FormHelperText error sx={{ mb: 3, mt: -3 }}>
                                    {errors.password.message}
                                </FormHelperText>
                            )}
                        </div>


                        {/* reCAPTCHA */}
                        <ReCAPTCHA
                            sitekey="6LfVvQArAAAAANIp_ZPobT1KOk_jMtOmhAPLkAIg"
                            onChange={(token) => {
                                console.log("reCAPTCHA Token:", token); // בדיקה האם ה-token מתקבל
                                setCaptchaToken(token);
                                setValue("captchaToken", token, { shouldValidate: true }); // שים את ה-token בטופס
                            }}
                            onExpired={() => {
                                console.log("reCAPTCHA Expired");
                                setCaptchaToken(null);
                                setValue("captchaToken", "", { shouldValidate: true }); // נקה את ה-token אם פג תוקף
                            }}
                        />
                        <input type="hidden" {...register("captchaToken", { required: true })} />
                        {errors.captchaToken && <FormHelperText error>Please complete the reCAPTCHA verification.</FormHelperText>}


                        <Button type="submit" variant="contained" sx={{
                            display: "block", width: "100%", mt: 2, mb: 3,
                            backgroundColor: "black",
                            color: "white",
                            "&:hover": { backgroundColor: "gray" }
                        }}>Entry</Button>
                    </form>

                    <Root sx={{ mb: 3 }}>
                        <Divider>New to our store?</Divider>
                    </Root>

                    <Button variant="outlined" onClick={() => navigate("/signUp")} sx={{
                        display: "block",
                        width: "100%",
                        mt: 2,
                        borderColor: "black",
                        color: "black",
                        backgroundColor: "white",
                        "&:hover": {
                            borderColor: "black",
                            borderWidth: "2px",
                        }
                    }}>Create an account</Button>

                    {loginError && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            <p>התחברות נכשלה. בדוק את המייל והסיסמה ונסה שוב.</p>
                        </div>
                    )}
                </Box>
            </Drawer>
        </div>
    );
}

export default SignIn;
