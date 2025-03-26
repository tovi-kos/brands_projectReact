import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartArr: JSON.parse(localStorage.getItem("cartArr")) || [],
    totalSum: JSON.parse(localStorage.getItem("totalSum")) || 0,
    totalCnt: JSON.parse(localStorage.getItem("totalCnt")) || 0
}

// פונקציה לחישוב סכום טוטאלי לתשלום בהתאם להוספת/הפחתת מוצרים מהעגלה
export  const   calculateTotal = (state) => {
    state.totalSum = state.cartArr.reduce((sum, item) => sum + item.price * item.qty, 0);
    localStorage.setItem("totalSum", JSON.stringify(state.totalSum));

}
export const calculateTotalCnt = (state) => {
    state.totalCnt = state.cartArr.reduce((cnt, item) => cnt + item.qty, 0);
    localStorage.setItem("totalCnt", JSON.stringify(state.totalCnt));

};

const saveToLocalStorage = (state) => {
    localStorage.setItem("cartArr", JSON.stringify(state.cartArr));
};

export const cartSlice = createSlice({
    name: "cartush",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.cartArr[index].qty++;
                state.totalCnt++;
                console.log("- עלה בהצלחה")
            }
            else
                state.cartArr.push({ ...action.payload, qty: 1 })
            calculateTotal(state);
            calculateTotalCnt(state);
            saveToLocalStorage(state);
        },
        decFromCart: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                if (state.cartArr[index].qty == 1) {
                    state.cartArr = state.cartArr.filter((_, i) => i !== index);
                    console.log("- ירד בהצלחה")
                }
                else
                    state.cartArr[index].qty--;
            }
            calculateTotal(state);
            calculateTotalCnt(state);
            saveToLocalStorage(state);
        },
          clearBrand: (state, action) => {
            let index = state.cartArr.findIndex(item => item._id == action.payload._id);
            if (index > -1) {
                state.cartArr=state.cartArr.filter((_,i)=>i!==index);
                console.log("the item deleted");
                
            }
            calculateTotal(state);
            calculateTotalCnt(state);
            saveToLocalStorage(state);
        },


        clearCart: (state, action) => {
            state.cartArr = [];
            state.totalSum = 0;
            state.totalCnt = 0;
            localStorage.removeItem("cartArr");
            localStorage.removeItem("totalSum");
            localStorage.removeItem("totalCnt");
        }
    }
})
export const { addToCart, decFromCart,clearBrand,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
