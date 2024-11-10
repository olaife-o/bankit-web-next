"use client"

import Image from "next/image"

import { SuccessTransferProps } from "@/lib/types/types"

import CustomButton from "../../general/custom-button"

import SuccessLogo from '@/../public/success-check.svg'
import { useRouter } from "next/navigation"

const SuccessTransfer = ({ closeModal, handleViewReceipt, amount, receipient }: SuccessTransferProps) => {
    
    const router = useRouter()

    const handleGotoDashboard = () => {
        closeModal()
        router.push('/dashboard/home')
    }

    return(
        <div className="bg-[#F5F5F5] w-[462px] rounded-3xl p-8">
            <div>
                <div className="flex justify-center">
                    <Image src={SuccessLogo} alt="success" />
                </div>
                <div className="my-6">
                    <h3 className="text-2xl font-bold text-main-black"> Transaction Successful</h3>
                    <p className="text-main-grey mt-2">You have successfully sent the sum of <span className="font-bold">N{amount}</span> to <span className="font-bold">{ receipient }</span></p>
                </div>
            </div>
            <div className="flex gap-5 w-full">
                <div className="w-full" onClick={handleViewReceipt}>
                    <CustomButton variant="outline" text="View Receipt" />
                </div>
                <div className="w-full" onClick={handleGotoDashboard}>
                    <CustomButton text="Go to Dashboard" />
                </div>
            </div>
        </div>
    )
}

export default SuccessTransfer;