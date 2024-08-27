import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {VerifiedIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button.jsx";
import AccountVerificationForm from "@/page/profile/AccountVerificationForm.jsx";
import {useSelector} from "react-redux";


const Profile = () => {
    const {user} = useSelector((state) => state.user); // Get user details from user slice

    const handleEnableTwoStepVerfication = () => {
        console.log("Two Step Verification")
    }

    return (
        <div className={'nflex nflex-col nmb-5 nitems-center'}>
            <div className={'npt-10 nw-full lg:nw-[60%]'}>
                <Card>
                    <CardHeader className={'npb-9'}>
                        <CardTitle>Your Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={'lg:nflex ngap-32'}>
                            <div className={'nspace-y-7'}>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Email : </p>
                                    <p className={'ntext-gray-500'}>{user?.email}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Full Name : </p>
                                    <p className={'ntext-gray-500'}>{user?.fullName}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Date of Birth : </p>
                                    <p className={'ntext-gray-500'}>{user?.dateOfBirth}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Nationality : </p>
                                    <p className={'ntext-gray-500'}>{user?.nationality}</p>
                                </div>
                            </div>

                            <div className={'nspace-y-7'}>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Address : </p>
                                    <p className={'ntext-gray-500'}>{user?.address}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>City : </p>
                                    <p className={'ntext-gray-500'}>{user?.city}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Postal Code : </p>
                                    <p className={'ntext-gray-500'}>{user?.postalCode}</p>
                                </div>
                                <div className={'nflex'}>
                                    <p className={'nw-[9rem]'}>Country : </p>
                                    <p className={'ntext-gray-500'}>{user?.country}</p>
                                </div>
                            </div>

                        </div>
                    </CardContent>
                </Card>
                <div className={'nmt-6'}>
                    <Card className={'nw-full'}>
                        <CardHeader className={'npb-7'}>
                            <div className={'nflex nitems-center ngap-3'}>
                                <CardTitle>2 Step Verification</CardTitle>
                                {
                                    true ? (
                                        <Badge className={'nspace-x-2 ntext-white nbg-green-700'}>
                                            <VerifiedIcon/>
                                            <span>
                                       Enable
                                    </span>
                                        </Badge>
                                    ) : (
                                        <Badge className={'nbg-red-800 ntext-white'}>Disable</Badge>

                                    )
                                }
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>Enable Two Step Verification</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Verify your account</DialogTitle>
                                        </DialogHeader>
                                        <AccountVerificationForm handleSubmit={handleEnableTwoStepVerfication}/>
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default Profile