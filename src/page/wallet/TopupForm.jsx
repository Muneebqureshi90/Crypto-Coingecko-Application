import {Input} from "@/components/ui/input.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {DotFilledIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {Label} from "@/components/ui/label.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DialogClose} from "@/components/ui/dialog.jsx";
import {useDispatch, useSelector} from "react-redux";
import {initiatePaymentOrder} from "@/redux/slices/wallet/walletSlice.js";

const TopupForm = () => {

    const [amount, setAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("STRIPE");
    const {wallet} = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    const handlePaymentMethod = (value) => {
        setPaymentMethod(value);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const handleOnSubmit = () => {
        // console.log(amount, paymentMethod);
        dispatch(initiatePaymentOrder({jwt:localStorage.getItem("jwt"),
        paymentMethod,
        amount}))
    };

    return (
        <div className={'npt-10 nspace-y-5'}>
            <div>
                <h1 className={'npb-1'}>Enter Amount</h1>
                <Input onChange={handleChange} value={amount} className={'npy-7 ntext-lg'} placeholder={"$9999"}/>
            </div>
            <div className={''}>
                <h1 className={'pb-1'}>Select Payment Method</h1>
                <RadioGroup onValueChange={(value) => handlePaymentMethod(value)}
                            className={'nflex nmt-3'} defaultValue={"RAZORPAY"}>
                    <div className={'nflex nitems-center nspace-x-2 nborder np-3 npx-5 nrounded-md'}>
                        <RadioGroupItem icon={DotFilledIcon} className={'nh-9 nw-9'}
                                        value={"RAZORPAY"}
                                        id={"r1"}/>
                        <Label htmlFor={"r1"}>
                            <div className={'nbg-white nrounded-md npx-2 npy-2 nw-32'}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png"
                                    alt=""/>
                            </div>
                        </Label>
                    </div>

                    <div className={'nflex  nitems-center nspace-x-2 nborder np-3 npx-5 nrounded-md'}>
                        <RadioGroupItem icon={DotFilledIcon} className={'nh-9 nw-9'}
                                        value={"STRIPE"}
                                        id={"r2"}/>
                        <Label htmlFor={"r2"}>
                            <div className={'nbg-white nrounded-md npx-2  nw-32'}>
                                <img className={'nh-9'}
                                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png"
                                     alt=""/>
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>
            {/*    button*/}
            <DialogClose className={'nw-full'}>
                <Button className={'nw-full npy-7'} onClick={handleOnSubmit}>
                    Submit
                </Button>
            </DialogClose>

        </div>
    )
}
export default TopupForm