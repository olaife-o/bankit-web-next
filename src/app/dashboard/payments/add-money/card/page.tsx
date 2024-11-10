"use client"


import { useState } from "react";
import EmptyCards from "./card-empty-component";
import CustomButton from "@/app/components/general/custom-button";
import { CardDepositAmountProps, CardListProps } from "@/lib/types/types";
import ConfirmTransaction from "@/app/components/dashboard/transfer/confirm-transaction";
import EnterPin from "@/app/components/dashboard/transfer/enter-pin";

const Cards = () => {

    const [ activeStep, setActiveStep ] = useState('cards')
    const [ openModal, setOpenModal ] = useState(false)
    const [ openReceiptModal, setOpenReceiptModal ] = useState(false)


    const closeModal = () => {
        setOpenModal(false)
    }

    const handleStepChange = ( step: string ) => {
        setActiveStep(step)
    }

    const handleSubmit = () => {
        setOpenModal(true)
    }

    const handleViewReceipt = () => {
        closeModal()
        setOpenReceiptModal(true)
    }

    const closeReceiptModal = () => {
        setOpenReceiptModal(false)
    }

    switch (activeStep) {
        case 'cards':
            return <EmptyCards handleStepChange={handleStepChange} />
        
        case 'new-card':
            return <NewCard handleStepChange={handleStepChange} />

        case 'amount':
            return <AmountDeposit handleStepChange={handleStepChange} />

        // case 'confirm':
        //     return (
        //         <ConfirmTransaction 
        //             handleStepChange={handleStepChange} 

        //         />
        //     )

        // case 'pin':
        //     return <EnterPin openModal={openModal} closeModal={closeModal} handleSubmit={handleSubmit} handleViewReceipt={handleViewReceipt} openReceiptModal={ openReceiptModal } closeReceiptModal={closeReceiptModal}/>
    
        default:
            break;
    }
}

const NewCard = ({ handleStepChange }: CardListProps) => {

    return(
        <div className="px-10 py-12 bg-[#F5F5F5] h-auto">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black"> Top up your account</h3>
                        <p className="text-main-grey "> Add funds to your account via cards </p>
                    </div>


                    <div className="bg-white rounded-3xl w-full p-8">

                        <div className="flex flex-col gap-6">
                            <div>
                                <label htmlFor="name" />
                                <input type="text" name="name" placeholder="Name on Card" className="bg-bg-input rounded-lg px-4 py-4 w-full" />
                            </div>

                            <div>
                                <label htmlFor="card-number" />
                                <input type="text" name="card-number" placeholder="Card Number" className="bg-bg-input rounded-lg px-4 py-4 w-full" />
                            </div>

                            <div className="flex gap-4">
                                <div className="w-full">
                                    <label htmlFor="exp-date" />
                                    <input type="text" name="exp-date" placeholder="Expiry Date" className="bg-bg-input rounded-lg px-4 py-4 w-full " />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="cvv" />
                                    <input type="text" name="cvv" placeholder="CVV" className="bg-bg-input rounded-lg px-4 py-4 w-full " />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8" onClick={() => handleStepChange('amount')}>
                            <CustomButton text="Proceed" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AmountDeposit = ({ handleStepChange }: CardDepositAmountProps) => {
    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black"> Top up your account</h3>
                        <p className="text-main-grey "> Add funds to your account via cards </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl w-full">
                    <div className="p-6">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="amount" />
                            <input type="text" name="amount" placeholder="Amount" className="bg-bg-input rounded-lg px-4 py-4 w-full" />

                        </div>
                        <div className="mt-6">
                            <CustomButton handleClick={() => handleStepChange('confirm')} text="Proceed" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Cards;