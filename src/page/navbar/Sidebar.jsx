import React from 'react';
import {ActivityLogIcon, BookmarkIcon, DashboardIcon, ExitIcon, HomeIcon, PersonIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.jsx";
import {SheetClose} from "@/components/ui/sheet.jsx";
import {CreditCardIcon, LandmarkIcon, WalletIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "@/redux/slices/auth/authSlice";

const menu = [
    {name: "home", path: "/", icon: <HomeIcon className='nh-6 nw-6'/>},
    {name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className='nh-6 nw-6'/>},
    {name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className='nh-6 nw-6'/>},
    {name: "Activity", path: "/activity", icon: <ActivityLogIcon className='nh-6 nw-6'/>},
    {name: "Wallet", path: "/wallet", icon: <WalletIcon className='nh-6 nw-6'/>},
    {name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className='nh-6 nw-6'/>},
    {name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className='nh-6 nw-6'/>},
    {name: "Profile", path: "/profile", icon: <PersonIcon className='nh-6 nw-6'/>},
    {name: "Logout", path: "/logout", icon: <ExitIcon className='nh-6 nw-6'/>},
];

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('jwt'); // Remove token from localStorage
        navigate('/signin'); // Redirect to home or login page
    };

    return (
        <div className="nmt-10 nspace-y-2">
            {menu.map((item) => (
                <div key={item.name}>
                    <SheetClose className='nw-full'>
                        <Button
                            onClick={() => item.name === "Logout" ? handleLogout() : navigate(item.path)}
                            variant="outline"
                            className='nflex nitems-center ngap-5 npy-6 nw-full'
                        >
                            <span className='nw-8'>{item.icon}</span>
                            <p>{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
