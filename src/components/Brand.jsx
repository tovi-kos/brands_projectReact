    import React, { useState, } from "react";
    import { useSelector, useDispatch } from "react-redux";
    import { addToCart, decFromCart } from "../features/cartSlice";
    import { CardContent, CardMedia, Card, Typography, IconButton, Box } from "@mui/material";
    import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
    import { Edit } from '@mui/icons-material';
    import VisibilityIcon from '@mui/icons-material/Visibility';
    import CartMini from "./CartMini";
    import { useNavigate, useLocation } from 'react-router-dom';
    import DeleteIcon from '@mui/icons-material/Delete'; 
    import { httpDeleteBrandById } from "../api/brandService";
    import Swal from 'sweetalert2';
    import {renderUrl} from "../../basicUrl"



    function Brand({ brnd,onBrandDeleted  }) {
        const manager = (useSelector(st => st.user.currentUser?.role)) === "MANAGER";
        let currentUser = useSelector(state => state.user.currentUser);
        let dispatch = useDispatch();
        let navigate = useNavigate();
        const location = useLocation(); // תופס את ה-URL הנוכחי
        const [open, setOpen] = useState(false);

    function delBrand(id){
        httpDeleteBrandById(id,currentUser?.token).then(res=>{
            console.log(res.data);
            onBrandDeleted(id);
            navigate(location.pathname, { replace: true });
            
        }).catch(err=>{
            console.log("cannot delete Brand byId "+err);
        })
    }



        return (
            <>
                <Card sx={{
                    width: 280,
                    height: 400, // גובה אחיד לכל הכרטיסים
                    boxShadow: 'none',
                    display: "flex",
                    border: "black solid 1px",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}>
                    {/* תמונה בגודל אחיד עם objectFit: "cover" */}
                    <CardMedia
                        component="img"
                        sx={{
                            height: 250, // גובה קבוע לכל התמונות
                            width: "100%",
                            objectFit: "cover" // מבטיח שהתמונה תכסה את השטח בלי עיוותים
                        }}
                        image={`${renderUrl}/${brnd.srcImg}`}
                        alt={brnd.modelBrand}
                    />

                    {/* שם המותג וכפתורים */}
                    <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 0 }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                            {brnd.nameBrand}

                        </Typography>

                        {!manager && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton
                                    onClick={() => {
                                        dispatch(addToCart(brnd));
                                        setOpen(true);
                                    }}
                                    sx={{
                                        borderRadius: '50%',
                                        backgroundColor: 'black',
                                        '&:hover': { backgroundColor: 'gray' },
                                        padding: 0.5,
                                        color: 'white',
                                        marginLeft: 1
                                    }}
                                >
                                    <ShoppingCartIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        )}
                        {!manager && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton
                                    onClick={() => {
                                        navigate(`details/${brnd._id}`);
                                    }}

                                    sx={{
                                        borderRadius: '50%',
                                        backgroundColor: 'black',
                                        '&:hover': { backgroundColor: 'gray' },
                                        padding: 0.5,
                                        color: 'white',
                                        marginLeft: 1,
                                        //cursor: "pointer"
                                    }}
                                >
                                    <VisibilityIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        )}
                        {manager && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton
                                    onClick={() => {
                                        navigate(`setBrandDetails/${brnd._id}`);
                                    }}
                                    sx={{
                                        borderRadius: '50%',
                                        backgroundColor: 'black',
                                        '&:hover': { backgroundColor: 'gray' },
                                        padding: 0.5,
                                        color: 'white',
                                        marginLeft: 1
                                    }}
                                >
                                    <Edit sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        )}
                        
                        {/* מחיקה*/}
                        {manager && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <IconButton
                                    onClick={() => {
                                        let model=brnd.modelBrand;
                                        Swal.fire({
                                        title: "Are you sure?",
                                        text: "Permanent deletion",
                                        icon: "warning",
                                        iconColor: "#d33",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#000000",
                                        confirmButtonText: " delete "
                                        }).then((result) => {
                                        if (result.isConfirmed) {
                                            // כאשר המשתמש מאשר את המחיקה, נבצע אותה
                                            delBrand(brnd._id); // קרא לפונקציה למחוק את המותג
                                            Swal.fire({
                                            title: "Deleted!",
                                            text: `${brnd.modelBrand} has been deleted.`,
                                            icon: "success",
                                            confirmButtonColor: '#4CAF50'
                                            });
                                        }
                                        });
                                    }}
                                    sx={{
                                        borderRadius: '50%',
                                        backgroundColor: 'black',
                                        '&:hover': { backgroundColor: 'gray' },
                                        padding: 0.5,
                                        color: 'white',
                                        marginLeft: 1
                                    }}
                                >
                                    <DeleteIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>
                        )}

                    </CardContent>

                    {/* טקסטים של model ו-price ית ומיושרים לימין */}
                    <CardContent sx={{
                        display: "flex",
                        paddingTop: 0,
                        flexDirection: "column",
                        textAlign: "left", // מיישר את הטקסטים לימין
                        justifyContent: "flex-end", // מצמיד לקרקעית    
                        flexGrow: 1, // דוחף את התוכן למטה
                        paddingBottom: 2 // מוסיף ריווח קטן מתחת
                    }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`model: ${brnd.modelBrand}`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`price: ${brnd.price}$`}
                        </Typography>
                    </CardContent>
                </Card>
                {open && <CartMini open={open} setOpen={setOpen} />}

            </>
        );
    }

    export default Brand;
