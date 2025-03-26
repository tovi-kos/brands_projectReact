import { TableRow, TableCell, Button, Box } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from "@mui/icons-material/Circle";
import LockIcon from "@mui/icons-material/Lock";
import { httpUpdateOrderById } from "../api/orderService";
import { useSelector } from "react-redux";
import { useState } from "react";

function Order({ order }) {
    const currentUser = useSelector(state => state.user.currentUser);
    const [isSent, setIsSent] = useState(order.isSent);

    const statusChange = () => {
        if (!currentUser?.token || currentUser.role !== "MANAGER") return; // בדיקה אם המשתמש הוא מנהל
        httpUpdateOrderById(order._id, { isSent: true }, currentUser.token)
            .then(() => {
                console.log("Order status updated successfully!");
                setIsSent(true);
                playSound();
            })
            .catch(err => {
                console.error(err);
                alert("Status update failed.");
            });
    };

    function playSound() {
        const audio = new Audio("/sound.mp3");
        audio.play();
    }

    return (
        <TableRow>
            <TableCell align="center">
                <CircleIcon sx={{ fontSize: "medium", color: isSent ? "green" : "red" }} />
            </TableCell>
            <TableCell align="center">{order._id}</TableCell>
            <TableCell align="center">{new Date(order.date).toLocaleDateString()}</TableCell>
            <TableCell align="center">{order.address}</TableCell>
            <TableCell align="center">{order.totalPrice} ₪</TableCell>
            <TableCell align="center">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <Button
                        variant="outlined"
                        sx={{
                            fontSize: "90%",
                            maxWidth: "20%",
                            backgroundColor: "white",
                            color: "black",
                            border: "2px solid black",
                            '&:hover': { backgroundColor: "black", color: "white", border: "2px solid black" },
                        }}
                    >
                        View Products
                    </Button>
                </Box>
            </TableCell>
            <TableCell align="center">
                {currentUser?.role === "MANAGER" &&(

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        {!isSent && (
                        <Button
                            sx={{ color: "black" }}
                            onClick={statusChange}
                        >
                            <SendIcon sx={{ border: "2px solid transparent", padding: "2px" }} />
                        </Button>
                        )}

                        {isSent && <LockIcon sx={{ fontSize: "large" }} />}
                    </Box>
                )}
            </TableCell>
            
        </TableRow>
    );
}

export default Order;
