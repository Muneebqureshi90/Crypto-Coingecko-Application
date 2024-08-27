import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { DollarSign, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react";
import { CopyIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx";
import TopupForm from "@/page/wallet/TopupForm.jsx";
import WithdrawalForm from "@/page/wallet/WithdrawalForm.jsx";
import TransferForm from "@/page/wallet/TransferForm.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addBalanceToWallet, getUserTransactions, getUserWallet } from "@/redux/slices/wallet/walletSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
    const { wallet, transactions } = useSelector((state) => state.wallet); // Access transactions directly
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use navigate hook here

    const query = useQuery();
    const orderId = query.get("order_id");
    const paymentId = query.get("payment_id");

    const handleFetchUserWallet = () => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            dispatch(getUserWallet(jwt))
                .unwrap()
                .then((result) => {
                    // console.log("User wallet data:", result);
                })
                .catch((error) => {
                    console.error("Error fetching user wallet:", error);
                });
        } else {
            console.error("JWT token not found in localStorage");
        }
    };

    const handleFetchWalletTransactions = () => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            dispatch(getUserTransactions(jwt))
                .unwrap()
                .then((result) => {
                    // console.log("User wallet transaction data:", result);
                })
                .catch((error) => {
                    console.error("Error fetching user transactions:", error);
                });
        } else {
            console.error("JWT token not found in localStorage");
        }
    };

    useEffect(() => {
        handleFetchUserWallet();
        handleFetchWalletTransactions();
    }, [dispatch]);

    useEffect(() => {
        if (orderId && paymentId) {
            dispatch(addBalanceToWallet({
                jwt: localStorage.getItem("jwt"),
                orderId,
                paymentId,
            })).unwrap()
                .then((result) => {
                    console.log("Balance added successfully:", result);
                    navigate("/wallet");
                })
                .catch((error) => {
                    console.error("Error adding balance:", error);
                });
        }
    }, [dispatch, orderId, paymentId, navigate]);

    return (
        <div className={'nflex nflex-col nitems-center'}>
            <div className={'npt-10 nw-full lg:nw-[60%]'}>
                <Card>
                    <CardHeader className={'npb-9'}>
                        <div className={'nflex njustify-between nitems-center'}>
                            <div className={'nflex nitems-center ngap-5'}>
                                <WalletIcon size={30} />
                                <div>
                                    <CardTitle className={'ntext-2xl'}>My Wallet</CardTitle>
                                    <div className='nflex nitems-center ngap-2'>
                                        <p className='ntext-sm ntext-gray-200'>{wallet?.id}</p>
                                        <CopyIcon size={13} className={'ncursor-pointer hover:ntext-slate-300'} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ReloadIcon onClick={handleFetchUserWallet}
                                            className={'ncursor-pointer nw-6 nh-6 hover:ntext-gray-400'} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={'nflex nitems-center'}>
                            <DollarSign />
                            <span className={'ntext-2xl nfont-semibold'}>
                                {wallet ? wallet.balance : 'Loading...'}
                            </span>
                        </div>
                        <div className={'nflex ngap-7 nmt-5'}>
                            {/* Add Money */}
                            <Dialog>
                                <DialogTrigger>
                                    <div
                                        className={'nh-24 nw-24 hover:ntext-gray-400 ncursor-pointer nitems-center  nflex nflex-col njustify-center nrounded-md nshadow-slate-800 nshadow-md'}>
                                        <UploadIcon />
                                        <span className={'ntext-sm nmt-2'}>Add Money</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Top Up Your Wallet</DialogTitle>
                                    </DialogHeader>
                                    <TopupForm />
                                </DialogContent>
                            </Dialog>
                            {/* Withdrawal */}
                            <Dialog>
                                <DialogTrigger>
                                    <div
                                        className={'nh-24 nw-24 hover:ntext-gray-400 ncursor-pointer nitems-center  nflex nflex-col njustify-center nrounded-md nshadow-slate-800 nshadow-md'}>
                                        <UploadIcon />
                                        <span className={'ntext-sm nmt-2'}>Withdrawal</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Request Withdrawal</DialogTitle>
                                    </DialogHeader>
                                    <WithdrawalForm />
                                </DialogContent>
                            </Dialog>
                            {/* Transfer */}
                            <Dialog>
                                <DialogTrigger>
                                    <div
                                        className={'nh-24 nw-24 hover:ntext-gray-400 ncursor-pointer nitems-center  nflex nflex-col njustify-center nrounded-md nshadow-slate-800 nshadow-md'}>
                                        <ShuffleIcon />
                                        <span className={'ntext-sm nmt-2'}>Transfer</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className={'ntext-xl ntext-center'}>Transfer to other wallet</DialogTitle>
                                    </DialogHeader>
                                    <TransferForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
                {/* History */}
                <div className={'npy-5 npt-10'}>
                    <div className={'nflex ngap-2 nitems-center npb-5'}>
                        <h1 className={'ntext-2xl nfont-semibold'}>
                            History
                        </h1>
                        <UpdateIcon onClick={handleFetchWalletTransactions} className={'nw-7 nh-7 ncursor-pointer hover:ntext-gray-400'} />
                    </div>
                    <div className={'nspace-y-5'}>
                        {transactions && transactions.length > 0 ? (
                            transactions.map((item, index) => (
                                <div key={index}>
                                    <Card className={'npx-5 nflex njustify-between nitems-center np-2'}>
                                        <div className={'nflex nitems-center ngap-5'}>
                                            <Avatar>
                                                <AvatarFallback>
                                                    <ShuffleIcon className={''} />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={'nspace-y-1'}>
                                                <h1>{item.type || item.purpose || BuyAssets}</h1>
                                                <p className={'ntext-sm ntext-gray-500'}>{item.date}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className={'ntext-green-400 nfont-semibold'}>{item.amount} USD</p>
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <p>No transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Wallet;
