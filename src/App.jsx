import './App.css';
import Navbar from "@/page/navbar/Navbar.jsx";
import Home from "@/page/home/Home.jsx";
import Portfolio from "@/page/Portfolio/Portfolio.jsx";
import Activity from "@/page/activity/Activity.jsx";
import Watchlist from "@/page/watchlist/Watchlist.jsx";
import Wallet from "@/page/wallet/Wallet.jsx";
import Withdrawal from "@/page/withdrawal/Withdrawal.jsx";
import PaymentDetails from "@/page/paymentDetails/PaymentDetails.jsx";
import Profile from "@/page/profile/Profile.jsx";
import StockDetails from "@/page/stockDetails/StockDetails.jsx";
import SearchCoin from "@/page/search/SearchCoin.jsx";
import NotFound from "@/page/notfound/NotFound.jsx";
import Auth from "@/page/auth/Auth.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Routes, Route} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from "react";
import {getUserProfile} from "@/redux/slices/user/userSlice.js";
import {setAuthToken} from "@/redux/slices/auth/authSlice.js";

function App() {
    const dispatch = useDispatch();
    const {jwt} = useSelector((state) => state.auth);
    // const {user} = useSelector((state) => state.user);
    useEffect(() => {
        const token = jwt || localStorage.getItem('jwt');
        if (token) {
            dispatch(setAuthToken(token)); // Set the token in Redux state
            dispatch(getUserProfile(token));
        }
        // console.log("Token from localStorage:", token);
        // console.log("Auth JWT:", token);
    }, [jwt, dispatch]);
    // useEffect(() => {
    //     if (user) {
    //         console.log("User Details:", user);
    //     }
    // }, [user]);
    const isAuthenticated = !!jwt;

    return (
        <>
            <ToastContainer position="bottom-center"/>
            {isAuthenticated ? (
                <>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/portfolio" element={<Portfolio/>}/>
                        <Route path="/activity" element={<Activity/>}/>
                        <Route path="/watchlist" element={<Watchlist/>}/>
                        <Route path="/wallet" element={<Wallet/>}/>
                        <Route path="/withdrawal" element={<Withdrawal/>}/>
                        <Route path="/payment-details" element={<PaymentDetails/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/market/:id" element={<StockDetails/>}/>
                        <Route path="/search" element={<SearchCoin/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </>
            ) : (
                <Auth/>
            )}
        </>
    );
}

export default App;
