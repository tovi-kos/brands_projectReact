import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Grid, Box, Snackbar, Alert } from '@mui/material';
import { httpAddOrder } from "../api/orderService.js"
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


const CheckOut = () => {
    let currentUser = useSelector(st => st.user.currentUser);
    let cartArr = useSelector(st => st.cart.cartArr || []);
    let totalSum = useSelector(st => st.cart.totalSum)
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            defaultValues: {
                name: currentUser?.userName||"",
                address: "",
                brands: cartArr,
                cardNumber: "",
                expirationDate: "",
                cvv: ""
            }
        }
    );

    const [paymentMethod, setPaymentMethod] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const save = (data) => {
        data.userId = currentUser._id;
        httpAddOrder(data, currentUser?.token)
            .then(() => {
                setSnackbarMessage("Order added successfully");
                setSnackbarOpen(true);
                setTimeout(() => {
                    Swal.fire({
                      title: "Successfully received",
                      icon: "success",
                      draggable: true,
                      confirmButtonColor: '#4CAF50',  // גוון ירוק של הוי הירוק
                    });
                  }, 200); // השהיה של 1.5 שניות
                
           
            })
            .catch(err =>{
                setSnackbarMessage("Error with adding the order");
                setSnackbarOpen(true);
                console.log('Submitting payment details:', err);
            })
            };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
            <Grid container spacing={3}>
                {/* Left & Middle Sections - Inputs */}
                <Grid item xs={8}>
                    <Typography variant="h4" gutterBottom align="center">Checkout</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="caption">UserName</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                {...register('name', { required: 'Name is required' })}
                                error={!!errors.name}
                                helperText={errors.name ? errors.name.message : ''}
                                sx={{ mb: 3 }}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="caption">Address</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                {...register('address', { required: 'Address is required' })}
                                error={!!errors.address}
                                helperText={errors.address ? errors.address.message : ''}
                                sx={{ mb: 3 }}
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="h6" gutterBottom>Payment Details</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="caption">Credit Card Number</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                {...register('cardNumber', { required: 'Card number is required' })}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber ? errors.cardNumber.message : ''}
                                sx={{ mb: 3 }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">Expiration Date</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                {...register('expirationDate', { required: 'Expiration date is required' })}
                                error={!!errors.expirationDate}
                                helperText={errors.expirationDate ? errors.expirationDate.message : ''}
                                sx={{ mb: 3 }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">CVV</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                {...register('cvv', { required: 'CVV is required' })}
                                error={!!errors.cvv}
                                helperText={errors.cvv ? errors.cvv.message : ''}
                                sx={{ mb: 3 }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right Section - Summary and Payment */}
                <Grid item xs={4}>
                    <div style={{ marginLeft: '25%', padding: '20px', paddingRight: '0', borderRadius: '8px' }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography
                                variant="h6"
                                color="black"
                                gutterBottom
                                sx={{ fontWeight: 'bold' }}>
                                Total Sum: {totalSum}
                            </Typography>
                            <Typography
                                variant="h6"
                                color="black"
                                gutterBottom
                                sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
                                Select Payment Method:
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, marginTop: '0.5rem' }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        flex: 1,
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: '2px solid black'
                                        }
                                    }}
                                >
                                    Credit Card
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        flex: 1,
                                        backgroundColor: 'black',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: '2px solid black'
                                        }
                                    }}
                                >
                                    PayPal
                                </Button>
                            </Box>
                            {/* Submit Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
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
                                    onClick={handleSubmit(save)}
                                >
                                    Complete Order
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </Grid>
            </Grid>

         
        </Container>
    );
};

export default CheckOut;
