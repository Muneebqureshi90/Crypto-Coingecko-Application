import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.jsx";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp.jsx";
import {useState} from "react";

const AccountVerificationForm = () => {

    const [value, setValue] = useState("");
    const handleSubmit = () => {
    console.log("VALUES :" ,value)
    }
    return (
        <div className={'nflex njustify-center'}>
            <div className={'nspace-y-5 nmt-10 nw-full'}>
                <div className={'nflex njustify-between nitems-center'}>
                    <p className={''}>Email :</p>
                    <p className={''}>muneebhaider564@gmail.om</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button>
                                Send OTP
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter Your OTP</DialogTitle>
                            </DialogHeader>
                            <div className={'npy-5 nflex ngap-10 njustify-center nitems-center'}>
                                <InputOTP className={'nflex'} value={value} onChange={(value) => setValue(value)} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0}/>
                                        <InputOTPSlot index={1}/>
                                        <InputOTPSlot index={2}/>
                                    </InputOTPGroup>
                                    <InputOTPSeparator/>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3}/>
                                        <InputOTPSlot index={4}/>
                                        <InputOTPSlot index={5}/>
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button onClick={handleSubmit} className={'nw-[10rem]'}>Submit</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    )
}
export default AccountVerificationForm