import { AppBar, Toolbar, Typography, IconButton, Box, Badge, Button } from "@mui/material";
import { ExitToApp, LocalMall, Person } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openDrawer } from "../features/drawerSlice";
import { setGender } from "../features/filterSlice";
import { useState } from "react";
import MenuUser from "./MenuUser";

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItemsCount = useSelector((state) => state.cart.totalCnt);
    const manager = (useSelector(st => st.user.currentUser?.role)) === "MANAGER";
    const hello = useSelector(st => st.user.currentUser?.userName) || null;
    const [anchorEl, setAnchorEl] = useState(null);  // שיניתי ל-anchorEl
    const openMenu = Boolean(anchorEl);  // השתמש ב-anchorEl

    return (
        <>
            <AppBar position="fixed" sx={{ bgcolor: "black", color: "white", width: "100%", zIndex: 1100, height: "70px" ,"&:focus": {
            outline: "none", // מבטל את המסגרת הלבנה
            backgroundColor: "transparent", // מבטל את הרקע האפור בזמן focus
        },}}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "70px", paddingX: 3 }}>
                    {/* התחברות ועגלת קניות */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, height: "100%", mt: "13px", pb: "2px" }}>
                        {!manager && (
                            <IconButton color="inherit" onClick={() => navigate("/cart")} sx={{ display: "flex", alignItems: "center", height: "100%" , "&:focus": { outline: "none", backgroundColor: "transparent"},"&:active": {
                                backgroundColor: "transparent", // מבטל את הרקע בזמן לחיצה
                            },}}>
                                <Badge badgeContent={cartItemsCount} color="error">
                                    <LocalMall />
                                </Badge>
                            </IconButton>
                        )}
                        {hello ? (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={(e) => setAnchorEl(e.currentTarget)}  // עדכון anchorEl
                                    sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", height: "100%" , "&:focus": { outline: "none", backgroundColor: "transparent"},"&:active": {
                                        backgroundColor: "transparent", // מבטל את הרקע בזמן לחיצה
                                    }, "&:hover": {
                                        backgroundColor: "transparent", // מבטל את הרקע בזמן hover
                                    }}}
                                >
                                    <Person />
                                    <Typography variant="body2" sx={{ color: "white", mt: "7px", pb: "2px" }}>
                                        {` hi, ${hello}`}
                                    </Typography>
                                </Button>
                                <MenuUser
                                    anchorEl={anchorEl}  // העברת anchorEl
                                    open={openMenu}
                                    onClose={() => setAnchorEl(null)}  // סגירת ה-menu
                                />
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                onClick={() => dispatch(openDrawer())}
                                sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", height: "100%", "&:focus": { outline: "none", backgroundColor: "transparent"},"&:active": {
                                    backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
                                }, "&:hover": {
                                    backgroundColor: "black", // מבטל את הרקע בזמן hover
                                } }}
                            >
                                <Person />
                                <Typography variant="body2" sx={{ color: "white", mt: "7px", pb: "2px" }}>
                                    Sign In / Sign Up
                                </Typography>
                            </Button>
                        )}
                    </Box>

                    {/* קישורי הניווט */}
                    <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3, alignItems: "center", height: "100%", mt: "13px", pb: "2px" }}>
                        <Button color="inherit" sx={{
                            fontSize: "15px", fontWeight: "300", textTransform: "none", height: "100%", "&:focus": { outline: "none", backgroundColor: "black"},"&:active": {
                                backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
                            } ,"&:hover": {
                                backgroundColor: "black", // מבטל את הרקע בזמן hover
                            }
                        }} onClick={() => { dispatch(setGender("Men")), navigate("/allbrands?gender=Men") }}>Men's Store</Button>
                        <Button color="inherit" sx={{ fontSize: "15px", fontWeight: "300", textTransform: "none", height: "100%", "&:focus": { outline: "none", backgroundColor: "black"} ,"&:active": {
            backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
        },}}
                         onClick={() => { dispatch(setGender("Women")), navigate("/allbrands?gender=Women") }}>Women's Store</Button>
                        <Button color="inherit" sx={{ fontSize: "15px", fontWeight: "300", textTransform: "none", height: "100%" , "&:focus": { outline: "none", backgroundColor: "black"},"&:active": {
            backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
        },}}
                         onClick={() => { dispatch(setGender("Kids")), navigate("/allbrands?gender=Kids") }}>Kid's Store</Button>
                        <Button color="inherit" sx={{ fontSize: "15px", fontWeight: "300", textTransform: "none", height: "100%" , "&:focus": { outline: "none", backgroundColor: "black"},"&:active": {
            backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
        },}}
                         onClick={() => { dispatch(setGender("Shoes")), navigate("/allbrands?gender=Shoes") }}>Shoes' Store</Button>
                            <Button color="inherit" sx={{ fontSize: "15px", fontWeight: "300", textTransform: "none", height: "100%" , "&:focus": { outline: "none", backgroundColor: "black"},"&:active": {
            backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
        },}}
                         onClick={() => { dispatch(setGender("Accessories")), navigate("/allbrands?gender=Accessories") }}>Accessories' Store</Button>

                        {manager && (
                            <Button
                                color="inherit"
                                onClick={() => navigate("/addBrand")}
                                sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", height: "100%", "&:focus": { outline: "none", backgroundColor: "black"} ,"&:active": {
                                    backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
                                },}}
                            >
                                <Typography variant="body2" sx={{ color: "white", mt: "7px", pb: "2px" }}>add brand</Typography>
                            </Button>
                        )}
                        {manager && (
                            <Button
                                color="inherit"
                                onClick={() => navigate("/allOrders")}
                                sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", height: "100%", "&:focus": { outline: "none", backgroundColor: "black"} ,"&:active": {
                                    backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
                                },}}
                            >
                                <Typography variant="body2" sx={{ color: "white", mt: "7px", pb: "2px" }}>all orders</Typography>
                            </Button>
                        )}
                        {manager && (
                            <Button
                                color="inherit"
                                onClick={() => navigate("/allUsers")}
                                sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: "14px", height: "100%" , "&:focus": { outline: "none", backgroundColor: "black"},"&:active": {
                                    backgroundColor: "black", // מבטל את הרקע בזמן לחיצה
                                },}}
                            >
                                <Typography variant="body2" sx={{ color: "white", mt: "7px", pb: "2px" }}>all users</Typography>
                            </Button>
                        )}
                    </Box>

                    {/* שם החנות */}

                    <Typography variant="h4"
                        sx={{
                            fontWeight: "bold", ml: "auto", pr: 3, display: "flex", alignItems: "center", height: "100%", mt: "13px", pb: "2px",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/home")}>
                        VIVA
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* רווח למניעת כיסוי התוכן */}
            <Box sx={{ paddingTop: "80px" }} />
        </>
    );
}

export default NavBar;
