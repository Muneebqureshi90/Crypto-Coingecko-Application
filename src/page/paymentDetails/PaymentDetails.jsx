import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import PaymentDetailsForm from "@/page/paymentDetails/PaymentDetailsForm.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPaymentDetails } from "@/redux/slices/payment/paymentSlice.js";

const PaymentDetails = () => {
    // const [hasPaymentDetails, setHasPaymentDetails] = useState(false);

    const { paymentDetails } = useSelector((state) => state.payment);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserPaymentDetails({
            jwt: localStorage.getItem("jwt"),
        }));
    }, [dispatch]);

    return (
        <div className="npx-20">
            <h1 className="ntext-3xl nfont-bold npy-10">Payment Details</h1>
            {paymentDetails ? (
                <Card>
                    <CardHeader>
                        <CardTitle>{paymentDetails.bankName}</CardTitle>
                        <CardDescription>
                            A/C No:
                            {paymentDetails.accountNumber.length > 4
                                ? `************${paymentDetails.accountNumber.slice(-4)}`
                                : paymentDetails.accountNumber}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="nflex nitems-center">
                            <p className="nw-32">A/C Holder</p>
                            <p className="ntext-gray-400"> : {paymentDetails.accountHolderName}</p>
                        </div>
                        <div className="nflex nitems-center">
                            <p className="nw-32">IFSC</p>
                            <p className="ntext-gray-400"> : {paymentDetails.ifsc}</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Dialog>
                    <DialogTrigger>
                        <Button className="npy-6">Add payment details</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Payment Details</DialogTitle>
                        </DialogHeader>
                        <PaymentDetailsForm />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default PaymentDetails;
