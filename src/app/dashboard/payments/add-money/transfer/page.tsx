"use client"

import Image from "next/image";

import Bank from '@/../public/bank.svg'
import SendBankit from '@/../public/send-bankit.svg'
import AccAvatar from '@/../public/acc-avatar.svg'
import CopyIcon from '@/../public/copy-icon.svg'

import CustomButton from "@/app/components/general/custom-button";

import { useAppSelector } from "@/lib/hooks"
import { ProfileType } from "@/lib/types/types"
import { copyToClipboard } from "@/lib/utils/utils";

const Transfer = () => {

    const profile = useAppSelector( state => state.profile as ProfileType )

    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black"> Top up your account</h3>
                        <p className="text-main-grey "> Add funds to your account via bank transfer </p>
                    </div>


                    <div className="bg-white rounded-3xl w-full p-8">
                        <div>
                            <div className="">
                                <div className="flex items-center gap-4 w-full mt-4">
                                    <div>
                                        <Image src={Bank} alt="Bank icon" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className="text-[#7A7A7A] text-xs">
                                                Bankit Account Number
                                            </span>
                                            <span className="text-main-black text-sm font-medium">{ profile?.accountDetails?.account_number }</span>
                                        </div>
                                        <div className="">
                                            <Image src={CopyIcon} alt="copy icon" className="cursor-pointer" onClick={() => copyToClipboard(profile?.accountDetails?.account_number || '')}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full mt-4">
                                    <div>
                                        <Image src={SendBankit} alt="Bank icon" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className="text-[#7A7A7A] text-xs">
                                                Bank
                                            </span>
                                            <span className="text-main-black text-sm font-medium">Bankit</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 w-full mt-4">
                                    <div>
                                        <Image src={AccAvatar} alt="Bank icon" />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className="text-[#7A7A7A] text-xs">
                                                Account Name
                                            </span>
                                            <span className="text-main-black text-sm font-medium">{ profile?.accountDetails?.account_name }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-left mt-6">
                                <span className="font-bold text-[#808080] ">Steps to follow</span>

                                <div className="bg-[#FAFBFF] rounded-lg p-3 mt-2">
                                    <ol className="text-main-grey text-[16px] list-decimal list-inside flex flex-col gap-3">
                                        <li>
                                            Copy the account number above
                                        </li>
                                        <li>
                                            Paste the number into the bank app you want to make transfer with
                                        </li>
                                        <li>
                                            Transfer the amount you want to pay into your Bankit account
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5">
                            <CustomButton text="Share Details" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transfer;