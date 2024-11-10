

"use client"

// import Image from "next/image"

import { ErrorTransferProps } from "@/lib/types/types"

import CustomButton from "../../general/custom-button"

// import SuccessLogo from '@/../public/success-check.svg'
import { useRouter } from "next/navigation"

const ErrorTransfer = ({ closeModal, errorData }: ErrorTransferProps) => {
    
    const router = useRouter()

    const handleGotoDashboard = () => {
        closeModal()
        router.push('/dashboard/home')
    }

    const handleCancel = () => {
        closeModal()
        router.push('/dashboard/payments/send-money')
    }

    return(
        <div className="bg-[#F5F5F5] w-[462px] rounded-3xl p-8">
            <div>
                <div className="flex justify-center">
                    <p className="text-red-500 text-9xl font-extrabold">X</p>
                </div>
                <div className="my-6">
                    <h3 className="text-2xl font-bold text-main-black">
                        Transaction Failed
                    </h3>
                    <p className="text-main-grey mt-2">
                        { errorData?.data.message }
                    </p>
                </div>
            </div>
            <div className="flex gap-5 w-full">
                <div className="w-full" onClick={handleCancel}>
                    <CustomButton variant="outline" text="Close" />
                </div>
                <div className="w-full" onClick={handleGotoDashboard}>
                    <CustomButton text="Go to Dashboard" />
                </div>
            </div>
        </div>
    )
}

export default ErrorTransfer;