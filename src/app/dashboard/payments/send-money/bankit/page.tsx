"use client"


import { useEffect, useState } from "react";


import EnterUsername from "@/app/components/dashboard/transfer/enter-username";
import EnterAmount from "@/app/components/dashboard/transfer/enter-amount";
import ConfirmTransaction from "@/app/components/dashboard/transfer/confirm-transaction";
import EnterPin from "@/app/components/dashboard/transfer/enter-pin";
import { useAppSelector } from "@/lib/hooks";
import { BankAccount, ProfileType } from "@/lib/types/types";
import { useGetBankitAccountDetailsQuery } from "@/lib/api/queryApi";
import { getDeviceInfo } from "@/lib/utils/utils";
import { useMakeTransferMutation } from "@/lib/api/mutationApi";



const Bankit = () => {

    const [ activeStep, setActiveStep ] = useState('username')
    const [ openModal, setOpenModal ] = useState(false)
    const [ openReceiptModal, setOpenReceiptModal ] = useState(false)
    const [ errorModal, setErrorModal ] = useState(false)

    const [ username, setUsername ] = useState<string>('')
    const [ activeAccount, setActiveAccount ] = useState<BankAccount | null>(null)
    const [ amount, setAmount ] = useState<number>(0)
    const [ narration, setNarration ] = useState<string>("")
    const [ transactionPin, setTransactionPin ] = useState<string>("")
    const [ receiptData, setReceiptData ] = useState()
    const [ errorData, setErrorData ] = useState<any>()

    const profile = useAppSelector( state => state.profile as ProfileType )



    const {
        data: getBankitAccountDetailsData,
        isLoading: getBankitAccountDetailsIsLoading,
        isSuccess: getBankitAccountDetailsIsSuccess,
        // isError: getBankitAccountDetailsIsError,
        error: getBankitAccountDetailsError,
        refetch: getBankitAccountDetailsReset,
    } = useGetBankitAccountDetailsQuery(
        username ? { username: username } : { username: '' }
    )

    const [
        makeTransferCall,
        {
            data: makeTransferData,
            isLoading: makeTransferIsLoading,
            isSuccess: makeTransferIsSuccess,
            isError: makeTransferIsError,
            error: makeTransferError,
        }
    ]= useMakeTransferMutation()

    const closeModal = () => {
        setOpenModal(false)
    }
    
    const handleStepChange = ( step: string ) => {
        setActiveStep(step)
    }

    const handleSubmit = () => {
        handleMakeTransfer()
    }

    const handleMakeTransfer = async () => {

        const deviceInfo = await getDeviceInfo()

        const body = {
            type: "external",
            amount: amount,
            transaction_pin: transactionPin,
            narration: narration ,
            username: username,
            // location: '',
            ...deviceInfo
        }
        console.log("body: ", body)

        makeTransferCall(JSON.stringify(body))
    }

    const handleViewReceipt = () => {
        closeModal()
        setOpenReceiptModal(true)
    }

    const closeReceiptModal = () => {
        setOpenReceiptModal(false)
    }

    const closeErrorModal = () => {
        setErrorModal(false)
    }

    useEffect(() => {
        console.log(getBankitAccountDetailsData)
        if(getBankitAccountDetailsData?.data){
            setActiveAccount(getBankitAccountDetailsData.data)
        }
    }, [ getBankitAccountDetailsIsSuccess ])

    useEffect(() => {
        if(makeTransferIsSuccess) {
            // console.log(makeTransferData);
            setOpenModal(true)
            setReceiptData(makeTransferData?.data)
            return
        }
        if(makeTransferIsError) {
            setErrorModal(true)
            setErrorData(makeTransferError)
        };
    }, [ makeTransferIsSuccess, makeTransferIsError ])

    switch (activeStep) {
        case "username":
            return (
                <EnterUsername 
                    handleStepChange={handleStepChange}
                    setUsername={setUsername}
                    username={username}
                    beneficiaries={profile?.beneficiaries}
                    searchSuccess={getBankitAccountDetailsIsSuccess}
                    isLoading={getBankitAccountDetailsIsLoading}
                    searchError={getBankitAccountDetailsError}
                    handleSearchUsername={getBankitAccountDetailsReset}
                />
            )

        case "amount":
            return (
                <EnterAmount 
                    handleStepChange={handleStepChange} 
                    amount={amount}
                    setAmount={setAmount}
                    narration={narration}
                    setNarration={setNarration}
                    receipient={activeAccount?.account_name}
                />
            )

        case "confirm":
            return (
                <ConfirmTransaction 
                    handleStepChange={handleStepChange}
                    receipient={ activeAccount?.account_name }
                    amount={ amount }
                    name={ 
                        profile ? 
                            `${profile?.first_name} ${profile?.last_name}`
                        : 
                            ''
                    }
                />
            )

        case "pin":
            return (
                <EnterPin 
                    openModal={openModal}
                    closeModal={closeModal}
                    handleSubmit={handleSubmit}
                    handleViewReceipt={handleViewReceipt}
                    openReceiptModal={ openReceiptModal }
                    closeReceiptModal={closeReceiptModal}
                    setPin={setTransactionPin}
                    receiptData={receiptData}
                    amount={amount}
                    receipient={activeAccount?.account_name}
                    isLoading={ makeTransferIsLoading }
                    errorModal={ errorModal }
                    errorData={ errorData }
                    closeErrorModal={ closeErrorModal }
                />
            )

        default:
            break;
    }
}


export default Bankit;