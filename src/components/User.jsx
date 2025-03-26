import { Grid, Card, CardContent, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function User({ user }) {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 3, border: "0px solid black",textAlign: "center" }}>
                <CardContent>
                    <Typography variant="h4" sx={{ color: "black" }}>
                        <PersonIcon fontSize="large" />
                    </Typography>
                    <Typography variant="h6" gutterBottom>{user.userName}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.mail}</Typography>
                    <Typography variant="body2" color="error">{user.role}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        תאריך הצטרפות: {new Date(user.dateSignIn).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default User;
