import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrdersForUser } from "@/redux/slices/order/orderSlice.js";

const Activity = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getAllOrdersForUser({ jwt }));
        } else {
            console.error("JWT is missing.");
            alert("You need to be logged in to fetch your orders.");
        }
    }, [dispatch]);

    return (
        <div className={'np-5 lg:np-20'}>
            <h1 className={'nfont-bold ntext-3xl npb-5'}>Activity</h1>
            <Table className={'nborder'}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="npy-5">Date & Time</TableHead>
                        <TableHead>Trading Pair</TableHead>
                        <TableHead>Buy Price</TableHead>
                        <TableHead>Selling Price</TableHead>
                        <TableHead>Order Type</TableHead>
                        <TableHead className="">Profit/Loss</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(orders) && orders.length > 0 ? (
                        orders.map((order, index) => {
                            const coin = order.orderItem?.coin || {}; // Access coin from orderItem
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <p>{new Date(order.timestamp).toLocaleString()}</p>
                                    </TableCell>

                                    <TableCell className="font-medium flex items-center gap-2">
                                        {coin ? (
                                            <>
                                                <Avatar className={'-z-50'}>
                                                    <AvatarImage
                                                        src={coin.image || 'default-image-url'} // Provide a default URL if image is missing
                                                    />
                                                </Avatar>
                                                <span>{coin.name || 'Unknown Coin'}</span>
                                            </>
                                        ) : (
                                            <span>No coin data</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="">${order.orderItem?.buyPrice || 'N/A'}</TableCell>
                                    <TableCell>${order.orderItem?.sellPrice || 'N/A'}</TableCell>
                                    <TableCell>{order.orderType || 'N/A'}</TableCell>
                                    <TableCell className="">${order.orderItem?.coin.total_volume || 'N/A'}</TableCell>
                                    <TableCell className="text-right">${calculateProfit(order) || 'N/A'}</TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan="7">No orders found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
const calculateProfit = (order) => {
    const buyPrice = parseFloat(order.orderItem?.buyPrice);
    const sellPrice = parseFloat(order.orderItem?.sellPrice);

    if (!isNaN(buyPrice) && !isNaN(sellPrice)) {
        const profit = sellPrice - buyPrice;
        return profit.toFixed(2); // Return the profit with 2 decimal places
    }

    return "-----";
};

export default Activity;
