import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import AllReviews from "../Pages/AllReviews";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import Main from "../HomeComponents/MainLayout";
import Error from "../Pages/Erro";
import Auth from "../Auth/Auth";
import PrivateAddReview from "../PrivateLayout/PrivateAddReview";
import AddReview from "../PrivateLayout/AddReview";
import PrivateWatchList from "../PrivateLayout/PrivateWatchList";
import Watchlist from "../PrivateLayout/Watchlist";
import PrivateMyReview from "../PrivateLayout/PrivateMyReview";
import MyReview from "../PrivateLayout/MyReview";
import Details from "../Pages/Details";
import Update from "../Pages/Update";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://assignment-test-10-server.vercel.app/reviews/highest-rated')

            },
            
            {
                path: '/detail/:id',
                element: <Details></Details>,
                loader: ({params}) => fetch(`https://assignment-test-10-server.vercel.app/reviews/${params.id}`)
            },
            {
                path: '/watch-list',
                element: <PrivateWatchList><Watchlist></Watchlist></PrivateWatchList>,
                loader: () => fetch('https://assignment-test-10-server.vercel.app/watchlists')
            },
            {
                path: '/my-reviews',
                element: <PrivateMyReview><MyReview></MyReview></PrivateMyReview>,
                loader: () => fetch('https://assignment-test-10-server.vercel.app/reviews')
            },
        ]
    },
    {
        path: '/all-reviews',
        element: <AllReviews></AllReviews>,
        loader: () => fetch('https://assignment-test-10-server.vercel.app/reviews')
    },
    {
        path: '/add-review',
        element: <PrivateAddReview> <AddReview></AddReview> </PrivateAddReview>
    },


    {
        path: '/auth',
        element: <Auth></Auth>,
        children: [
            {
                path: '/auth/register',
                element: <Register></Register>
            },
            {
                path: '/auth/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({params}) =>fetch(`https://assignment-test-10-server.vercel.app/reviews/${params.id}`)
    }
])

export default router