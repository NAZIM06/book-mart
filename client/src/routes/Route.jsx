
import Error from "../pages/Shared/Error";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Dashboard from "../Layout/Dashboard";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Main from "../Layout/Main";
import Books from "../pages/Books/Books";
import AddBook from "../pages/Dashboard/AddBook/AddBook";
import MyBooks from "../pages/Dashboard/MyBooks/MyBooks";
import ManageBooks from "../pages/Dashboard/ManageBooks/ManageBooks";
import MySelectedBooks from "../pages/Dashboard/MySelectedBooks/MySelectedBooks";
import MyPurchedBooks from "../pages/Dashboard/MyPurchedBooks/MyPurchedBooks";
import SellerRoute from "../routes/SellerRoute";
import BuyerRoute from "./BuyerRoute";
import { createBrowserRouter } from "react-router-dom";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";



const route = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home />
            },

            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
            ,

            {
                path: 'about-us',
                element: <AboutUs />
            },
            {
                path: 'books',
                element: <Books/>
            },
            {
                path: 'contact',
                element: <Contact/>
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                errorElement: <Error></Error>,
                children: [
                    {
                        path: 'add-book',
                        element: <SellerRoute><AddBook /></SellerRoute>
                    },
                    {
                        path: 'my-books',
                        element: <SellerRoute> <MyBooks /></SellerRoute>
                    },
                    {
                        path: 'manage-users',
                        element: <AdminRoute><ManageUsers /></AdminRoute>
                    },
                    {
                        path: 'manage-books',
                        element: <AdminRoute><ManageBooks /></AdminRoute>
                    },
                    {
                        path: 'my-selected-books',
                        element: <BuyerRoute><MySelectedBooks/></BuyerRoute>
                    },
                    {
                        path: 'payment/:id',
                        element: <BuyerRoute><Payment /></BuyerRoute>,
                        loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/selected-book/${params.id}`)
                    },
                    {
                        path: 'my-purched-books',
                        element: <BuyerRoute><MyPurchedBooks /></BuyerRoute>
                    },
                    {
                        path: 'payment-history',
                        element: <BuyerRoute><PaymentHistory /></BuyerRoute>
                    }
                ]
            }


        ]
    }
])

export default route;