import { Input } from "@/components/ui/input.jsx";
import { Avatar, AvatarImage } from "@/components/ui/avatar.jsx";
import { DotIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactions, getUserWallet } from "@/redux/slices/wallet/walletSlice.js";
import { fetchUserAssetByCoinId } from "@/redux/slices/asset/assetSlice.js";
import {useParams} from "react-router-dom";
import {fetchCoinDetails} from "@/redux/slices/coins/coinSlice.js";
import {payOrder} from "@/redux/slices/order/orderSlice.js";

const TreadingForm = () => {
    const [orderType, setOrderType] = useState("BUY");
    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { coinDetails } = useSelector((state) => state.coin);
    const { wallet } = useSelector((state) => state.wallet); // Access wallet directly
    const { asset } = useSelector((state) => state.asset);

    const dispatch = useDispatch();
    const { id } = useParams();
    const jwt = localStorage.getItem("jwt");
    const { coins } = useSelector((state) => state.coin);

    useEffect(() => {
        if (id && jwt) {
            dispatch(fetchCoinDetails({ coinId: id, jwt }))
                .then((action) => {
                    if (fetchCoinDetails.fulfilled.match(action)) {
                        console.log('Coin details fetched successfully:', action.payload);
                    } else {
                        console.error('Failed to fetch coin details:', action.error.message);
                        alert('There was an error fetching coin details. Please try again.');
                    }
                });
        } else {
            console.error('ID or JWT is missing.');
            if (!jwt) {
                alert('You need to be logged in to fetch coin details.');
            }
        }
    }, [dispatch, id, jwt]);
    const coin = coins.find(coin => coin.id === id) || {};

    const handleChange = (e) => {
        const inputAmount = parseFloat(e.target.value);
        setAmount(inputAmount);

        if (coinDetails?.market_data?.current_price?.usd) {
            const volume = calculateBuyCost(inputAmount, coinDetails.market_data.current_price.usd);
            setQuantity(volume);
        }
    };

    const calculateBuyCost = (amount, price) => {
        if (!price || price <= 0 || amount <= 0) return 0;
        let volume = amount / price;
        let decimalPlaces = Math.max(2, price.toString().split(".")[1]?.length || 0);
        return volume.toFixed(decimalPlaces);
    };

    const handleFetchUserWallet = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            dispatch(getUserWallet(jwt))
                .unwrap()
                .then((result) => {
                    // Handle result if needed
                })
                .catch((error) => {
                    console.error("Error fetching user wallet:", error);
                });
        } else {
            console.error("JWT token not found in localStorage");
        }
    };

    const handleFetchUserAsset = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && coinDetails?.id) {
            dispatch(fetchUserAssetByCoinId({ coinId: coinDetails.id, jwt }))
                .unwrap()
                .then((result) => {
                    console.log("User asset data:", result);
                })
                .catch((error) => {
                    console.error("Error fetching user asset:", error);
                });
        } else {
            console.error("JWT token or Coin ID not found");
        }
    };

    useEffect(() => {
        console.log("Coin Details:", coinDetails);

        if (coinDetails) {
            handleFetchUserWallet();
            handleFetchUserAsset();
        }
    }, [dispatch, coinDetails]); // Remove coinDetails.id, include coinDetails as a dependency

    const handleBuyCrypto=()=>{
        dispatch(
            payOrder({jwt:localStorage.getItem("jwt"),
            amount,
            orderData:{
                coinId:coinDetails?.id,
                quantity,
                orderType
            }})
        )
    }

    return (
        <div className={'nspace-y-10 np-5'}>
            <div>
                <div className={'nflex ngap-4 nitems-center njustify-between'}>
                    <Input className={'npy-7 focus:noutline-none'}
                           placeholder={"Enter Amount..."}
                           onChange={handleChange}
                           type={"number"}
                           name={"amount"}
                           value={amount}
                    />
                    <div className={''}>
                        <p className={'nborder ntext-2xl nflex njustify-center nitems-center nw-36 nh-14 nrounded-md'}>
                            {quantity}
                        </p>
                    </div>
                </div>
                {false && (
                    <h1 className={'ntext-red-600 ntext-center npt-4'}>Insufficient wallet balance to buy</h1>
                )}
            </div>
            <div className={'nflex nitems-center ngap-5'}>
                <div>
                    <Avatar>
                        <AvatarImage
                            // src={"https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"}
                            src={coin?.image || "fallback-image-url"}                        />
                    </Avatar>
                </div>
                <div>
                    <div className={'nflex nitems-center ngap-2'}>
                        <p>{coin?.symbol?.toUpperCase() || 'Symbol'}</p>
                        <DotIcon className={'ntext-gray-400'}/>
                        <p className={'ntext-gray-400'}>{coin?.name || 'Name'}</p>
                    </div>
                    <div className={'nflex nitems-center ngap-2'}>
                        <p className={'ntext-xl nfont-bold'}>${coinDetails?.market_data?.current_price?.usd}</p>
                        <p className={'ntext-red-600'}>
                            <span className={''}>{coin?.market_cap_change_24h || 'Change 24h'}$</span>
                            <span className={''}>({coin?.market_cap_change_percentage_24h || 'Change %'}%)</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={'nflex nitems-center njustify-between'}>
                <p>Order Type</p>
                <p>Market Order</p>
            </div>
            <div className={'nflex nitems-center njustify-between'}>
                <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
                <p>
                    {orderType === "BUY"
                        ? `$${wallet ? wallet.balance : 'Loading...'}`
                        : asset
                            ? asset.quantity
                            : "Loading..."}
                </p>
            </div>
            <Button onClick={handleBuyCrypto()} className={`nw-full npy-6 ${orderType === "SELL" ? "nbg-red-600 ntext-white" : ""}`}>
                {orderType}
            </Button>
            <Button variant={"link"} className={'nw-full nmt-5 ntext-xl'}
                    onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}>
                {orderType === "BUY" ? "Or Sell" : "Or Buy"}
            </Button>
        </div>
    );
};

export default TreadingForm;
