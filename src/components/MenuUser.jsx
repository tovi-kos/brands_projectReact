import React from 'react';
import { Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { ExitToApp, Edit, ReceiptLong } from '@mui/icons-material';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userOut } from '../features/userSlice';
import { clearCart } from '../features/cartSlice';
import EditUserProfile from "./UserEdit"
function MenuUser({ anchorEl, open, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const manager = (useSelector(st => st.user.currentUser?.role)) === "MANAGER";


    const handleLogout = () => {
        dispatch(userOut());
        dispatch(clearCart());
        onClose();
    };

    return (
        <Menu
            anchorEl={anchorEl} 
            open={open}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            sx={{
                '& .MuiPaper-root': {  // סגנונות ל-Paper של המניו
                    boxShadow: 'none',  // ביטול הצללה
                    borderRadius: '0',  // ביטול הקצוות המעוגלים
                    backgroundColor: 'black',  // רקע שחור
                    color: 'white',  // טקסט לבן
                },
                '& .MuiMenuItem-root': {  // סגנונות עבור כל MenuItem
                    color: 'white',  // צבע טקסט לבן עבור כל פריט במניו
                    '&:hover': {
                        backgroundColor: 'gray',  // צבע רקע אפור כאשר העכבר עובר על הפריט
                    },
                },
                '& .MuiListItemIcon-root': {  // סגנונות עבור האיקונים
                    color: 'white',  // צבע האיקונים לבן
                },
                '& .MuiDivider-root': {  // סגנונות עבור ה-divider
                    backgroundColor: 'white',  // צבע דיוידר לבן
                },
            }}
        >
            <MenuItem onClick={() => { navigate("/editUser"); onClose(); }}>
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                Edit Profile
            </MenuItem>
{!manager&&(
            <MenuItem onClick={() => { navigate("/allOrders"); onClose(); }}>
                <ListItemIcon>
                    <ReceiptLong fontSize="small" />
                </ListItemIcon>
                My Orders
            </MenuItem>
)}
            <Divider />

            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <ExitToApp fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}

export default MenuUser;
