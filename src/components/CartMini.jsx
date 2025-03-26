import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, List, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import BrandInMiniCart from "./BrandInMiniCart";
import { useNavigate } from "react-router-dom";

const CartMini = ({ open, setOpen }) => {
    const { cartArr, totalSum, totalCnt } = useSelector(state => state.cart);
    const [timerId, setTimerId] = useState(null);
    const navigate = useNavigate();
    let user = useSelector((state) => state.user) || null;


    if (!open) return null;

    useEffect(() => {
        if (open) {
            console.log("why print?");

            const timer = setTimeout(() => {
                setOpen(false);
            }, 3000);

            setTimerId(timer);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const handleMouseEnter = () => {
        if (timerId) {
            clearTimeout(timerId);
        }
    };

    const handleMouseLeave = () => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3000);
        setTimerId(timer);
    };

    return (
        <Paper
            elevation={6}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                position: "fixed",
                bottom: 20,
                left: 20,
                width: 300,
                p: 2,
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#fff",
                zIndex: 9999,
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle1" fontWeight="medium" color="textSecondary">
                    <strong style={{ fontWeight: "bold", color: "black" }}>{totalCnt}</strong> Items in the shopping cart
                </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ maxHeight: 220, overflowY: "auto" }}>
                <List>
                    {cartArr.map(item => (
                        <Box key={item._id} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <BrandInMiniCart brnd={item} />
                        </Box>
                    ))}
                </List>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box textAlign="left">
                <Typography variant="body1" fontWeight="bold">
                    סה"כ: ₪{totalSum}
                </Typography>
                <Typography variant="body2" color="textSecondary">(₪0.00) Free shipping</Typography>
            </Box>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ maxWidth: "48%", backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "white", color: "black", border: "2px solid black" } }}
                    onClick={() => navigate("/cart")}
                >
                    לצפייה בסל
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ maxWidth: "48%", backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "white", color: "black", border: "2px solid black" } }}
                    onClick={() => {
                        if (user) {
                            navigate("/checkout");
                        } else {
                            navigate("/signUp");
                        }
                    }}
                >
                    לקופה
                </Button>
            </Box>
        </Paper>
    );
};

export default CartMini;
