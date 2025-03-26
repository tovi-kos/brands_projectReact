import { useSelector } from "react-redux";
import BrandInCart from "../components/BrandInCart";
import { List, Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BrandsCart() {
  let cartArr = useSelector((state) => state.cart.cartArr) || [
    { nameBrand: "Tommy", price: 123, qty: 2, img: "https://via.placeholder.com/100" },
  ];
  let totalSum = useSelector((state) => state.cart.totalSum);
  let totalCnt = useSelector((state) => state.cart.totalCnt);
  let currentUser = useSelector(st => st.user.currentUser)||null;
    const navigate = useNavigate();

  return (
    <>
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        textAlign="center" 
        mb={3}
        sx={{ marginRight: "30%" }}
      >
        Shopping cart
      </Typography>
      <Box 
        sx={{
          width: "100vw", 
          display: "flex", 
          justifyContent: "flex-start", 
          alignItems: "flex-start",
          paddingLeft: 0,
          marginLeft: 0,
          overflowX: "hidden", // מבטל גלילה לרוחב
        }}
      >
        {/* רשימת המוצרים בצד שמאל */}
        <List sx={{ margin: 0, padding: 0, width: "100%", maxWidth: "700px" }}>
          {cartArr.map((item, index) => (
            <BrandInCart key={item._id || index} brnd={item} />
          ))}
        </List>

        {/* סיכום הזמנה קבוע בצד ימין קרוב יותר למרכז */}
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            top: "40%", // קרוב יותר למרכז
            right: "20px",
            width: "300px", // גודל גדול יותר
            padding: "30px", // רווח פנימי גדול יותר
            marginRight: "10%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Order Summary
          </Typography>
          <Typography variant="body1">Total items: {totalCnt}</Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>
            Total: {totalSum} $
          </Typography>

          <Button
            onClick={() => {
              if (currentUser!==null) {
                navigate("/checkout");
              } else {
                navigate("/signUp");
              }
            }}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
                border: "2px solid black",
              },
            }}
          >
            Proceed to Checkout
          </Button>
        </Paper>
      </Box>
    </>
  );
}

export default BrandsCart;
