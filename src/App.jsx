import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut userData={userData} setUserData={setUserData} />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "products/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },

        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      {" "}
     <CartContextProvider><RouterProvider router={routes}></RouterProvider></CartContextProvider>
        
      
    </>
  );
}

export default App;
