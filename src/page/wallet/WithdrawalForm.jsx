import {Input} from "@/components/ui/input.jsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {requestWithdrawal} from "@/redux/slices/withdrawal/withdrawalSlice.js";

const WithdrawalForm = () => {
    const [amount, setAmount] = useState("");
    const { wallet } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();
    const { paymentDetails } = useSelector((state) => state.payment);
    const { withdrawal } = useSelector((state) => state.withdrawal);

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(requestWithdrawal({ amount, jwt: localStorage.getItem("jwt") }));
        console.log("Amount:" + amount);
    };

    return (
        <div className={'npt-10 nspace-y-5'}>
            <div
                className={'nflex njustify-between nitems-center nrounded-md nbg-slate-900 ntext-xl nfont-bold npx-5 npy-4'}>
                <p>Available balance</p>
                <p>${wallet ? wallet.balance : 'Loading...'}
                </p>
            </div>
            <div className={'nflex nflex-col nitems-center'}>
                <h1>Enter Withdrawal amount</h1>
                <div className={'nflex njustify-center nitems-center'}>
                    <Input onChange={handleChange} value={amount}
                           className={'npy-7 nborder-none noutline-none withdrawalInput focus:noutline-none npx-0 ntext-xl ntext-center'}
                           placeholder={"$9999"} type={"number"}/>
                </div>
            </div>
            <div>
                <p className={'npb-2'}>Transfer to</p>
                <div className={'nflex nitems-center ngap-5 nborder npy-2 npx-5 nrounded-md'}>
                    <img className={'nh-8 nw-8'}
                         src={"https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"} alt={''}/>
                    <div>
                        <p className={'ntext-xl nfont-bold'}>{paymentDetails?.bankName}</p>
                        <p className={'ntext-xs'}>{paymentDetails?.accountNumber.length > 4
                            ? `************${paymentDetails?.accountNumber.slice(-4)}`
                            : paymentDetails?.accountNumber}</p>
                    </div>
                </div>
                <DialogClose className={'nw-full'}>
                    <Button onClick={handleSubmit} className={'nw-full npy-7 ntext-xl'}>Withdraw</Button>
                </DialogClose>
            </div>
        </div>
    )
}
export default WithdrawalForm