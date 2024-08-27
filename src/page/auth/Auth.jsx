import './Auth.css';
import SigninForm from "@/page/auth/SIgninForm.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import ForgetPasswordForm from "@/page/auth/ForgetPasswordForm.jsx";
import SignupForm from "@/page/auth/SignupForm.jsx"; // Import your CSS file

const Auth = () => {
    const naviagte = useNavigate();
    const location = useLocation();
    return (
        <div className={'nh-screen nrelative authContainer'}>
            <div className={'nabsolute ntop-0 nright-0 nleft-0 nbottom-0 bg-[#030712] nbg-opacity-50'}>
                <div
                    className={'nbgBlure nabsolute nmt-10 nleft-1/3 ntransform -ntranslate-x-1/2 -ntranslate-y-1/2 nflex nflex-col njustify-center nitems-center nh-[35rem] nw-[30rem] nrounded-md nz-50 nbg-black nbg-opacity-50 nshadow-2xl nshadow-white npx-10'}>
                    <h1 className={'ntext-6xl nfont-bold npb-9'}>ItsMy Treading</h1>

                    {location.pathname == "/signup" ?
                        <section className={'nw-full'}>
                            <SignupForm/>
                            <div className={'njustify-center nflex nitems-center'}>
                                <span>Have already account</span>
                                <Button onClick={() => naviagte("/signin")} variant={"ghost"}>signin</Button>
                            </div>
                        </section>
                        :
                        location.pathname == "/forget-password" ?
                            <section className={'nw-full'}>
                                <ForgetPasswordForm/>
                                <div className={'njustify-center nflex nitems-center nmt-3'}>
                                    <span>Back to login?</span>
                                    <Button onClick={() => naviagte("/signin")} variant={"ghost"}>signin</Button>
                                </div>
                            </section>
                            :
                            <section className={'nw-full'}>
                                <SigninForm/>
                                <div className={'njustify-center nflex nitems-center'}>
                                    <span>{"Don't have account?"}</span>
                                    <Button onClick={() => naviagte("/signup")} variant={"ghost"}>signup</Button>
                                </div>

                                <div className={'nmt-10'}>
                                    <Button className={'nw-full npy-5'} onClick={() => naviagte("/forget-password")}
                                            variant={"outline"}>Forget
                                        Password</Button>
                                </div>
                            </section>
                    }
                </div>
            </div>


        </div>
    )
}
export default Auth