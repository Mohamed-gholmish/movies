import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import PC from "./Components/PC/PC";
import NotFound from "./Components/NotFound/NotFound";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./Components/protectedRoute/protectedRoute";
import ProductDetails from "./Components/GameDetails/GameDetails";
import Browser from "./Components/Browser/Browser";

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
          path: "pc",
          element: (
            <ProtectedRoute>
              <PC />{" "}
            </ProtectedRoute>
          ),
        },
        {path: 'browser',
      elemnt:(<ProtectedRoute><Browser/></ProtectedRoute>)},
      
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
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
