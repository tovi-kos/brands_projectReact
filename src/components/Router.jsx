import { Route, Routes } from "react-router-dom"
import BrandList from "../pages/BrandsList";
import BrandsCart from "../pages/BrandsCart";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AddProduct from "./AddBrand";
import CheckOut from "../pages/CheckOut";
import BrandDetails from "./BrandDetails"
import HomePage from "../pages/HomePage";
import BrandUpdate from "./BrandUpdate";
import OrdersList from "../pages/OrdersList";
import UsersList from "../pages/UsersList";
import EditUserProfile  from "./UserEdit";
import BrandListByBrand from "../pages/BrandListByBrand";

function Router() {
    return (
        <Routes>
            <Route path="allBrands" element={<BrandList />}>
                <Route path="details/:id" element={<BrandDetails />} />
                <Route path="setBrandDetails/:id" element={<BrandUpdate />} />
            </Route>
            <Route path="home" element={<HomePage />} />
            <Route path="cart" element={<BrandsCart />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="addBrand" element={<AddProduct />} />
            <Route path="allOrders" element={<OrdersList />} />
            <Route path="allUsers" element={<UsersList />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="EditUser" element={<EditUserProfile />} />
            <Route path="/byBrand" element={<BrandListByBrand />} />
            <Route path="*" element={<BrandList />} />


        </Routes>
    );
}



export default Router;