import { Input } from "@/components/ui/input.jsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { DialogClose, DialogContent } from "@/components/ui/dialog.jsx";
import { useDispatch, useSelector } from "react-redux";
import { walletToWalletTransfer } from "@/redux/slices/wallet/walletSlice.js";
import {toast} from "react-toastify";

const TransferForm = () => {
    const { wallet } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        amount: '',
        walletId: '',
        purpose: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const result = await dispatch(walletToWalletTransfer({
                jwt: localStorage.getItem("jwt"),
                walletId: formData.walletId,
                walletTransaction: {
                    amount: formData.amount,
                    purpose: formData.purpose,
                },
            })).unwrap();

            toast.success("Transfer successful!");
            // console.log(result);
        } catch (error) {
            toast.error(`Transfer failed: ${error.message}`);
            console.error("Transfer Error:", error);
        }
    };

    return (
        <DialogContent aria-describedby="transfer-form-description">
            <div className={'npt-10 nspace-y-5'}>
                <div>
                    <h1 className={'npb-1'}>Enter Amount</h1>
                    <Input
                        onChange={handleChange}
                        name={"amount"}
                        value={formData.amount}
                        className={'npy-7 ntext-lg'}
                        placeholder={"$9999"}
                    />
                </div>

                <div>
                    <h1 className={'npb-1'}>Wallet Id</h1>
                    <Input
                        onChange={handleChange}
                        name={"walletId"}
                        value={formData.walletId}
                        className={'npy-7 ntext-lg'}
                        placeholder={"#ABDEA423"}
                    />
                </div>

                <div>
                    <h1 className={'npb-1'}>Purpose</h1>
                    <Input
                        onChange={handleChange}
                        name={"purpose"}
                        value={formData.purpose}
                        className={'npy-7 ntext-lg'}
                        placeholder={"Gift for your friends..."}
                    />
                </div>
                <DialogClose className={'nw-full'}>
                    <Button onClick={handleSubmit} className={'nw-full npy-7'}>
                        Submit
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
    );
};
export default TransferForm;
