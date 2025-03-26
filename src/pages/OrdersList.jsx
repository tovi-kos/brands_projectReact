import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { httpGetAllOrders, httpGetAllOrdersByUserId } from "../api/orderService.js";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Order from "../components/Order";

function OrderList() {
    const [arrOrders, setArrOrders] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        if (currentUser?.token) {
            if (currentUser?.role === "MANAGER") {
                // אם מדובר במנהל, נקבל את כל ההזמנות
                httpGetAllOrders(currentUser.token)
                    .then(res => setArrOrders(res.data))
                    .catch(err => {
                        console.error(err);
                        alert("Oops, failed to fetch orders");
                    });
            } else {
                // אם מדובר במשתמש רגיל, נקבל את ההזמנות לפי ID
                httpGetAllOrdersByUserId(currentUser._id, currentUser.token)
                    .then(res => setArrOrders(res.data))
                    .catch(err => {
                        console.error(err);
                        alert("Oops, failed to fetch orders");
                    });
            }
        }
    }, [currentUser]);

    return (
        <TableContainer sx={{ mt: 3, p: 2, width: "100vw", maxWidth: "1200px", margin: "auto" }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
                Order List
            </Typography>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Order Number</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Date</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Address</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Total Price</TableCell>

                        <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>See Products</TableCell>
                        {currentUser?.role === "MANAGER" && (
                            <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Change Status</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {arrOrders.map(order => (
                        <Order key={order._id} order={order} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderList;
