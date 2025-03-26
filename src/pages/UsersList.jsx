import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { httpGetAllUsers } from "../api/userService";
import { Grid, Container } from "@mui/material";
import User from "../components/User";

function UsersList() {
    const [arrUsers, setArrUsers] = useState([]);
    const currentUser = useSelector(state => state.user.currentUser);

    useEffect(() => {
        httpGetAllUsers(currentUser?.token)
            .then(res => setArrUsers(res.data))
            .catch(err => {
                console.error(err);
                alert("Oops, failed to fetch users");
            });
    }, [currentUser]);

    return (
        <Container maxWidth={false} sx={{ mt: 4, px: 5 }}> 
            <Grid container spacing={6} justifyContent="center"> 
                {arrUsers.map(user => (
                    <User key={user._id} user={user} />
                ))}
            </Grid>
        </Container>
    );
}

export default UsersList;
