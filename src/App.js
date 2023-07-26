import { Routes, Route } from "react-router-dom";
import RootLayout from "./component/RootLayout";
import HomePage from "./component/HomePage";
import ListItems from "./features/items/ListItems";
import AddNewItem from "./features/items/AddNewItem";
import ListUsers from "./features/users/ListUsers";
import AddNewUsers from "./features/users/AddNewUsers";
import ListOrder from "./features/order/ListOrder";
import AddNewOrder from "./features/order/AddNewOrder";
import Prefetch from "./features/auth/Prefetch";
import ListCart from "./features/cart/ListCart";
import HomeSingleProduct from "./component/HomeSingleProduct";
import DashLayout from "./component/DashLayout";
import DashHome from "./component/DashHome";
import CustomerProfile from "./component/CustomerProfile";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/ROLES";
import NotFound from "./component/NotFound";
import OrderForAddReview from "./features/order/OrderForAddReview";
import ItemReview from "./component/ItemReview";
import CustomerWishList from "./features/wishList/CustomerWishList";
import ListWishList from "./features/wishList/ListWishList";
import EditItem from "./features/items/EditItem";
import ResetPassword from "./component/ResetPassword";
import LoginForm from "./component/LoginForm";
import OrderPlaceSuccess from "./features/cart/OrderPlaceSuccess";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path=":id/item" element={<HomeSingleProduct />} />
        <Route path=":id/reviews" element={<ItemReview />} />
        <Route path="carts" element={<ListCart />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="reset" element={<ResetPassword />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route
              element={<RequireAuth allowedRoles={Object.values(ROLES)} />}
            >
              <Route path="dash">
                <Route index element={<HomePage />} />
                <Route path=":id/item" element={<HomeSingleProduct />} />
                <Route path=":id/reviews" element={<ItemReview />} />
                <Route path="carts" element={<ListCart />} />
                <Route path="success" element={<OrderPlaceSuccess />} />
                <Route path="customer-profile" element={<CustomerProfile />} />

                <Route path="orders">
                  <Route index element={<ListOrder />} />
                  <Route path="new" element={<AddNewOrder />} />
                  <Route path=":id" element={<OrderForAddReview />} />
                </Route>

                <Route path="wish_lists">
                  <Route index element={<ListWishList />} />
                  <Route path="user" element={<CustomerWishList />} />
                </Route>
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Super]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<ListUsers />} />
                    <Route path="new" element={<AddNewUsers />} />
                  </Route>

                  <Route path="items">
                    <Route index element={<ListItems />} />
                    <Route path="new" element={<AddNewItem />} />
                    <Route path=":id" element={<EditItem />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
