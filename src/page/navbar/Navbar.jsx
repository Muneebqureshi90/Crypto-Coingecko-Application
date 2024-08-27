import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {Button} from "@/components/ui/button.jsx";
import {DragHandleHorizontalIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import bitcoinImage from '../../assets/images/bitcoin-4647175_1920.jpg';
import Sidebar from "@/page/navbar/Sidebar.jsx";
import {useSelector} from "react-redux";
import React from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {user} = useSelector((state) => state.user); // Get user details from user slice
    const firstLetter = user?.fullName?.[0]?.toUpperCase() || 'U';

    // console.log("User is", user);
    // console.log("name", firstLetter);

    return (
        <div
            className="npx-2 npy-3 nz-50 nbg-background nbg-opacity-0 nsticky ntop-0 nleft-0 nright-0 nflex njustify-between nitems-center nborder-b">
            <div className='nflex nitems-center ngap-3'>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="nrounded-full nh-11 nw-11">
                            <DragHandleHorizontalIcon className='nh-7 nw-7'/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='nw-72 nborder-r-0 nflex nflex-col njustify-center' side="left">
                        <SheetHeader>
                            <SheetTitle>
                                <div className='ntext-3xl nflex njustify-center nitems-center ngap-1'>
                                    <Avatar>
                                        <AvatarImage src={bitcoinImage} alt="Bitcoin Image"/>
                                        <AvatarFallback>Fallback Text</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <span className='nfont-bold ntext-orange-700'>ItsMy</span>
                                        <span>Tread</span>
                                    </div>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        <Sidebar/>
                    </SheetContent>
                </Sheet>
                {/*    name*/}
                <Link to="/" className="ncursor-pointer">
                    <p className="ntext-sm lg:ntext-base">
                        <span className="nfont-bold ntext-xl ntext-orange-700">ItsMy </span> Treading
                    </p>
                </Link>
                <div className='np-0 nml-9'>
                    <Button variant="outline" className='nflex nitems-center ngap-3 nw-full lg:nw-64'>
                        <MagnifyingGlassIcon className='nh-5 nw-5'/>
                        <span className='nml-1'>Search</span>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
}

export default Navbar;
