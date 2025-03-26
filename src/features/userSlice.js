import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null
}

const userSlice = createSlice({
    name: 'userush',
    initialState,
    reducers: {
        userIn: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload))
        },
        userOut: (state, action) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        },
        userUpdate: (state, action) => {
            if (state.currentUser) {
                state.currentUser.userName = action.payload;
                localStorage.setItem("currentUser", JSON.stringify(state.currentUser))

            }
        }
    }
}
)
export const { userIn, userOut, userUpdate } = userSlice.actions;
export default userSlice.reducer;