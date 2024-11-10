"use client"


import { useEffect, useState } from "react";


// import EnterUsername from "@/app/components/dashboard/transfer/enter-username";
import EnterAmount from "@/app/components/dashboard/transfer/enter-amount";
import ConfirmTransaction from "@/app/components/dashboard/transfer/confirm-transaction";
import EnterPin from "@/app/components/dashboard/transfer/enter-pin";
import EnterBankAccount from "@/app/components/dashboard/transfer/enter-bank";

import { useAppSelector } from "@/lib/hooks";
import { BankAccount, BankOptionType, ProfileType } from "@/lib/types/types";
import { useGetBankAccountDetailsQuery, useGetBanksListQuery } from "@/lib/api/queryApi";
import { useMakeTransferMutation } from "@/lib/api/mutationApi";

// import { deviceDetect, isAndroid } from "react-device-detect";
// import { userAgent } from "next/server";
import { getDeviceInfo } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";



const Others = () => {

    const [ activeStep, setActiveStep ] = useState('account-details')
    const [ openModal, setOpenModal ] = useState(false)
    const [ openReceiptModal, setOpenReceiptModal ] = useState(false)
    const [ errorModal, setErrorModal ] = useState(false)

    const profile = useAppSelector( state => state.profile as ProfileType )

    const [ accountNumber, setAccountNumber ] = useState('')
    const [ bank, setBank ] = useState<BankOptionType | null>(null)

    const [ activeAccount, setActiveAccount ] = useState<BankAccount | null>(null)
    const [ amount, setAmount ] = useState<number>(0)
    const [ narration, setNarration ] = useState<string>("")
    const [ transactionPin, setTransactionPin ] = useState<string>("")
    const [ receiptData, setReceiptData ] = useState()
    const [ errorData, setErrorData ] = useState<any>()

    const router = useRouter()

    // console.log("deviceDetect", deviceDetect(window.navigator.userAgent))
    // console.log("isAndroid: ", isAndroid)
    

    const {
        data: getBanksListData,
        // isLoading: getBanksListIsLoading,
        // isSuccess: getBanksListIsSuccess,
        // isError: getBanksListIsError,
        // error: getBanksListError,
        refetch: getBanksListReset,
    } = useGetBanksListQuery(null)

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

    const {
        data: getBankAccountDetailsData,
        // isLoading: getBankAccountDetailsIsLoading,
        isSuccess: getBankAccountDetailsIsSuccess,
        // isError: getBankAccountDetailsIsError,
        // error: getBankAccountDetailsError,
        refetch: getBankAccountDetailsReset,
    } = useGetBankAccountDetailsQuery(
        accountNumber && bank?.code ? { account_number: accountNumber, code: bank.code } : { accountNumber: "", code: "" }
    )

    const closeModal = () => {
        setOpenModal(false)
    }
    
    const handleStepChange = ( step: string ) => {
        setActiveStep(step)
    }

    const handleSubmit = () => {
        // setOpenModal(true)
        handleMakeTransfer()
    }

    const handleViewReceipt = () => {
        closeModal()
        setOpenReceiptModal(true)
    }

    const closeReceiptModal = () => {
        router.push('/dashboard/home')
        setOpenReceiptModal(false)
    }

    const closeErrorModal = () => {
        setErrorModal(false)
    }

    const handleMakeTransfer = async () => {
        const deviceInfo = await getDeviceInfo()
        const body = {
            type: "external",
            amount: amount,
            transaction_pin: transactionPin,
            account_number: accountNumber,
            narration: narration ,
            bank_code: bank?.code,
            // location: '',
            ...deviceInfo
        }
        console.log("body: ", body)

        makeTransferCall(JSON.stringify(body))
    }

    // useEffect(() => {
    //     console.log(
    //         `
    //             bank-list: ${getBanksListData?.data}
    //         `,
    //         `
    //             bank-account: ${getBankAccountDetailsData}
    //         `
    //     )
    // }, [ getBankAccountDetailsIsSuccess, getBanksListIsSuccess ])

    useEffect(() => {
        getBanksListReset()
    }, [])

    useEffect(() => {
        console.log(getBankAccountDetailsData)
        if(getBankAccountDetailsData?.data){
            setActiveAccount(getBankAccountDetailsData.data)
        }
    }, [ getBankAccountDetailsIsSuccess ])

    useEffect(() => {
        if(makeTransferIsSuccess) {
            console.log(makeTransferData);
            setOpenModal(true)
            setReceiptData(makeTransferData?.data)
        }

        if(makeTransferIsError) {
            setErrorModal(true)
            setErrorData(makeTransferError)
        };
    }, [ makeTransferIsSuccess, makeTransferIsError ])

    switch (activeStep) {
        case "account-details":
            return (
                <EnterBankAccount 
                    handleAccountSearch={getBankAccountDetailsReset} 
                    banksList={getBanksListData?.data} 
                    beneficiaries={profile?.beneficiaries} 
                    handleStepChange={handleStepChange}
                    bank={bank}
                    accountNumber={accountNumber}
                    setBank={setBank}
                    setAccountNumber={setAccountNumber}
                    activeAccount={activeAccount}
                    setActiveAccount={setActiveAccount}
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
                    logo={bank?.logo}
                />
            )

        case "confirm":
            return (
                <ConfirmTransaction 
                    handleStepChange={handleStepChange} 
                    receipient={activeAccount?.account_name}
                    amount={amount}
                    name={profile ? `${profile?.first_name} ${profile?.last_name}` : ''}
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
                    // pin={transactionPin}
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


export default Others;