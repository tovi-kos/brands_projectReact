import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    IconButton, Typography, CircularProgress, CardMedia,
    Box, Grid, Paper, Chip, Button, Dialog
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { httpGetBrandById } from "../api/brandService.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import CartMini from "./CartMini.jsx";
import {renderUrl} from "../../basicUrl"



function BrandDetails() {
    let params = useParams();
    let [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        httpGetBrandById(params.id).then(res => {
            setBrand(res.data);
            setLoading(false);
        }).catch(err => {
            console.log("Error fetching brand details: " + err.response?.data?.message);
            setLoading(false);
        });
    }, [params.id]);

    return (
        <Dialog open={true} onClose={() => navigate(-1)} fullScreen>
            <Paper sx={{
                bgcolor: "white",
                color: "black",
                overflow: "hidden",
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>
                <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ zIndex: 1, padding: "8px" }}>
                    <IconButton
                        onClick={() => navigate(-1)}
                        sx={{
                            color: "white",
                            bgcolor: "black",
                            borderRadius: "50%",
                            padding: "8px",
                            "&:hover": {
                                bgcolor: "darkgrey"
                            }
                        }}>
                        <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                </Box>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <CircularProgress sx={{ color: "black" }} />
                    </Box>
                ) : (
                    <Grid container spacing={4} alignItems="center" sx={{ height: "100%", overflow: "auto" }}>
                        {/* Brand Image */}
                        <Grid item xs={12} md={6} sx={{ height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: "90vh",
                                    maxWidth: "70%", // התמונה תהיה במרכז ועם רוחב שמתאים
                                    objectFit: "cover",
                                    borderRadius: 2
                                }}
                                image={`${renderUrl}/${brand.srcImg}`}
                                alt={brand.modelBrand}
                            />
                        </Grid>

                        {/* Brand Details */}
                        <Grid item xs={12} md={6} sx={{ paddingBottom: "16px", overflowY: "auto" }}>
                            <Typography variant="h3" fontWeight="bold">{brand?.nameBrand}</Typography>
                            <Typography variant="h5" color="gray">Model: {brand?.modelBrand}</Typography>

                            <Box mt={2} p={2} border={1} borderRadius={2} borderColor="black" sx={{ maxWidth: "50%" }}>
                                {/* Placeholder content for future use */}
                                <Typography variant="body1">Take advantage of the opportunity💫
                                    Unprecedented sale!!!<br />
                                    Buy 10 products and get a 10% discount.<br />
                                    Don't miss out...</Typography>
                            </Box>

                            <Typography variant="h6" mt={2} fontWeight="bold">Price: {brand?.price} ₪</Typography>

                            <Box mt={2}>
                                <Typography variant="subtitle1" fontWeight="bold">Category:</Typography>
                                <Chip label={brand?.category} sx={{ bgcolor: "black", color: "white", margin: 0.5 }} />
                            </Box>

                            <Box mt={2}>
                                <Typography variant="subtitle1" fontWeight="bold">Available Sizes:</Typography>
                                {brand?.size ? (brand.size.map((s, index) => (
                                    <Chip key={index} label={s} variant="outlined" sx={{ borderColor: "black", color: "black", margin: 0.5 }} />
                                ))) : <p>one size</p>}
                            </Box>

                            <Box mt={4}>
                                <Button

                                    onClick={() => {
                                        dispatch(addToCart(brand));
                                        setOpen(true);
                                    }}
                                    variant="contained"
                                    sx={{
                                        bgcolor: "black",
                                        color: "white",
                                        width: "50%",
                                        fontSize: "1.2rem",
                                        padding: "10px 0",
                                        marginBottom: "16px"
                                    }}
                                >
                                    ADD TO CART
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Paper>
            {open && <CartMini open={open} setOpen={setOpen} />}
        </Dialog>
    );
}

export default BrandDetails;
