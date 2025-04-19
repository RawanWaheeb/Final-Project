// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import Home from "./Components/Home/Home";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";
// import { Toaster } from "react-hot-toast";
// import ProductedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import NotFound from "./pages/NotFound/NotFound";
// import UserPeovider from "./Context/User.context";
// import GuestProdectedRoute from "./components/GuestRoute/GuestRoute";
// import CartProvider from "./Context/Cart.context";
// import Cart from "./pages/Cart/Cart";
// import ProductDetails from "./pages/ProductDetails/ProductDetails";
// import CheackOut from "./pages/CheackOut/CheackOut";
// import Orders from "./pages/Orders/Orders";
// import Products from "./pages/Products/Products";
// import WishList from "./pages/WishList/WishList";
// import WishListProveder from "./Context/WishList.context";
// import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";
// import NewPassword from "./pages/NewPassword/NewPassword";

// import Profile from "./pages/profile/Profile";
// import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";


// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Offline, Online } from "react-detect-offline";
// import OffLine from "./components/OffLine/OffLine";
// import AiScanner from "./components/aiScaner/AiScaner";
// import Community from "./components/community/Community";
// export default function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: (
//         <ProductedRoute>
//           <Layout />
//         </ProductedRoute>
//       ),
//       children: [
       
//         { path: "Cart", element: <Cart /> },
       
//         { path: "shop", element: < Products/> },
//         { path: "Home", element: < Home/> },
//         { path: "/", element: <Home /> },
//         { path: "Details/:slug", element: <ProductDetails /> },
//         { path: "cheacout", element: <CheackOut /> },
//         { path: "allorders", element: <Orders /> },
//         { path: "WishList", element: <WishList /> },
//         { path: "Profile", element: <Profile /> },
        
//         { path: "UpdateProfile", element: <UpdateProfile /> }, 
//         {path : "Community" , element:<Community/>},
//           {path : "aiScaner" , element:<AiScanner/>},  
//           { path: "ai_help", element: <AiScanner /> },       
         
          
//       ],
//     },


//     {
//       path: "/",
//       element: (
//         <GuestProdectedRoute>
//           <Layout />
//         </GuestProdectedRoute>
//       ),
//       children: [
   
//         { path: "Signup", element: <Signup /> },
//         { path: "Login", element: <Login /> },
//         { path: "forgetPassword", element: <ForgetPassword /> },
//         { path: "resetPassword", element: <ResetPassword /> },
//         { path: "newPassword", element: <NewPassword /> },
//         { path: "home", element: < Home/> },
//         { path: "/", element: <Home /> },
      
//       ],
//     },

   
    
//     {path: "*",element: <NotFound />
// },
//   ]);

//   const queryClient = new QueryClient();
//   return (
//     <>
//       <Online>
//         <QueryClientProvider client={queryClient}>
//           <UserPeovider>
//             <CartProvider>
//               <WishListProveder>
//                 <RouterProvider router={router} />
//               </WishListProveder>
//             </CartProvider>
//           </UserPeovider>
//           <Toaster position="top-center" />
//         </QueryClientProvider>
//       </Online>
//       <Offline>
//         <OffLine />
//       </Offline>
//     </>
//   );
// }




/////////////////////////////////////////////////////////////RAWAN/////////////////////////////////////////////////////////////////////////////////////////////////////////////





import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout"; 
import Home from "./components/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";  
import { Toaster } from "react-hot-toast";
import ProductedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import UserProvider from "./Context/User.context";
import CartProvider from "./Context/Cart.context";
import WishListProvider from "./Context/WishList.context";  
import GuestRoute from "./components/GuestRoute/GuestRoute";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/profile/Profile";
import Products from "./pages/Products/Products";
import AiScanner from "./components/aiScaner/AiScaner";
import Community from "./components/community/Community";
import Wishlist from "./pages/Wishlist/Wishlist";  
import CheackOut from "./pages/CheackOut/CheackOut";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import NewPassword from "./pages/NewPassword/NewPassword";
import Orders from "./pages/Orders/Orders";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";
import Changepassword from "./pages/Changepassword/Changepassword.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// import { Offline, Online } from "react-detect-offline";
// import OffLine from "./components/OffLine/OffLine";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Products", element: <Products /> }, 
        { path: "ai_help", element: <AiScanner /> },
        { path: "community", element: <Community /> },
      ],
    },                                                                   

    {
      path: "/",
      element: (
        <ProductedRoute>
          <Layout />
        </ProductedRoute>
      ),
      children: [
        { path: "profile", element: <Profile /> },
        { path: "UpdateProfile", element: <UpdateProfile /> }, 
        { path: "changepassword", element: <Changepassword/> }, 
        { path: "cart", element: <Cart/> },
        { path: "wishlist", element: <Wishlist /> },  
        { path: "cheacout", element: <CheackOut /> }, 
        { path: "allorders", element: <Orders /> },
        { path: "product/:slug", element: <ProductDetails /> },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/resetpassword", element: <ResetPassword /> },  
    { path: "/newpassword", element: <NewPassword /> },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
     <ToastContainer />

      <UserProvider>
        <CartProvider>
          <WishListProvider>  
            <RouterProvider router={router} />
            <Toaster position="top-center" />
          </WishListProvider>
        </CartProvider>
      </UserProvider>
      
    </>
  );
}



