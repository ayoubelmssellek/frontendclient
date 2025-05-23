// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home";
// import { Menu } from "./pages/Menu/Menu";
// import { LoginAndSignUp } from "./pages/loginAndSignUp/loginAndSignUp";
// import ShopingCart from "./components/ShoupingCart/ShopingCart";
// import FilterByQatigory from "./components/FilterByQatigory/FilterByQatigory";
// import { SingleProPage } from "./pages/SingleProPage/SingleProPage";
// import FavoriteDishes from "./components/FavoriteDishes/FavoriteDishes";
// import ClientAccount from "./components/Account/ClientAccount";
// import './styles/clientindex.css'
// import Shopingcartpage from "./pages/shopingcart/Shopingcartpage";
// import OrderSuccess from "./components/Ordersuccess/OrderSuccess";
// // import { OrderDetails } from "./components/Orderdetails/Orderdetails";
// import AddReview from "./components/Reviews/AddReview";
// import OrderHistory from "./components/Order-history/OrderHistory";
// import Settings from "./components/AccountSettings/AccountSetting";
// import { ContactForm } from "./components/ContactUs/ContactUs";



// function ClientRoutes() {
//   return (
//     <div className="clientapp">
//         <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/menu" element={<Menu />} />
//       <Route path="/login" element={<LoginAndSignUp />} />
//       <Route path="/shoupingCart" element={<Shopingcartpage />} />
//       <Route path="/category/:category" element={<FilterByQatigory/>} />
//       <Route path="/product/:id" element={<SingleProPage />} />
//       <Route path="/favorite" element={<FavoriteDishes />} />
//       <Route path="/myaccount" element={<ClientAccount />} />
//       <Route path="/orderSuccess" element={<OrderSuccess />} />
//       {/* <Route path="/OrderDetails" element={<OrderDetails />} /> */}
//       <Route path="/addreview" element={<AddReview />} />
//       <Route path="/orderhistory" element={<OrderHistory />} />
//       <Route path="/settings" element={<Settings />} />
//       <Route path="/contactUs" element={<ContactForm />} />


//     </Routes>
//     </div>
//   );
// }

// export default ClientRoutes;
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import './styles/clientindex.css';
import Loading from "../Helper/Loading/Loading"; // تأكد من المسار حسب مشروعك

const Home = lazy(() => import("./pages/home/Home"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const LoginAndSignUp = lazy(() => import("./pages/loginAndSignUp/loginAndSignUp"));
const Shopingcartpage = lazy(() => import("./pages/shopingcart/Shopingcartpage"));
const FilterByQatigory = lazy(() => import("./components/FilterByQatigory/FilterByQatigory"));
const SingleProPage = lazy(() => import("./pages/SingleProPage/SingleProPage"));
const FavoriteDishes = lazy(() => import("./components/FavoriteDishes/FavoriteDishes"));
const ClientAccount = lazy(() => import("./components/Account/ClientAccount"));
const OrderSuccess = lazy(() => import("./components/Ordersuccess/OrderSuccess"));
// const OrderDetails = lazy(() => import("./components/Orderdetails/Orderdetails")); // Unused
const AddReview = lazy(() => import("./components/Reviews/AddReview"));
const OrderHistory = lazy(() => import("./components/Order-history/OrderHistory"));
const Settings = lazy(() => import("./components/AccountSettings/AccountSetting"));
const ContactForm = lazy(() => import("./components/ContactUs/ContactUs"));

function ClientRoutes() {
  return (
    <div className="clientapp">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginAndSignUp />} />
          <Route path="/shoupingCart" element={<Shopingcartpage />} />
          <Route path="/category/:category" element={<FilterByQatigory />} />
          <Route path="/product/:id" element={<SingleProPage />} />
          <Route path="/favorite" element={<FavoriteDishes />} />
          <Route path="/myaccount" element={<ClientAccount />} />
          <Route path="/orderSuccess" element={<OrderSuccess />} />
          {/* <Route path="/OrderDetails" element={<OrderDetails />} /> */}
          <Route path="/addreview" element={<AddReview />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contactUs" element={<ContactForm />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default ClientRoutes;
