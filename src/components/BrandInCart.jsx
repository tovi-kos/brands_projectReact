import { useDispatch } from "react-redux";
import { addToCart, decFromCart, clearBrand } from "../features/cartSlice";
import { ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { X } from "lucide-react"; // אייקון X קטן
import { renderUrl } from "../../basicUrl";

function BrandInCart({ brnd }) {
  let dispatch = useDispatch();

  return (
    <ListItem 
      divider 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      {/* כפתור הסרת מוצר עם אייקון X - מיושר לשמאל */}
      <IconButton 
        onClick={() => dispatch(clearBrand(brnd))}
        sx={{ 
          color: "black",
          marginRight: 1, // קצת רווח מהתמונה
        }}
      >
        <X size={16} />
      </IconButton>

      {/* תמונה */}
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={`${renderUrl}/${brnd.srcImg}`}
          alt={brnd.nameBrand}
          sx={{ width: 80, height: 80, borderRadius: 2 }}
        />
      </ListItemAvatar>

      {/* פרטי המוצר */}
      <ListItemText
        primary={brnd.nameBrand}
        secondary={
          <>
            <Typography variant="body2">Model: {brnd.modelBrand}</Typography>
            <Typography variant="body2">Price: {brnd.price} $</Typography> {/* הוספת מחיר ליחידה */}
          </>
        }
        sx={{ flexGrow: 1, mx: 2 }}
      />

      {/* שליטה בכמות */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, borderRadius: 2, p: 0.5 }}>
        <IconButton onClick={() => dispatch(decFromCart(brnd))} sx={{ p: 0.5 }}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Typography variant="body1">{brnd.qty}</Typography>
        <IconButton onClick={() => dispatch(addToCart(brnd))} sx={{ p: 0.5 }}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </ListItem>
  );
}

export default BrandInCart;
