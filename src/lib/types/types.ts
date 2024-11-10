
// Send Money

// import { BaseQueryFn, QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query"
import { Dispatch, SetStateAction } from "react"

export type EnterPinProps = {
    handleSubmit: () => void,
    handleViewReceipt: () => void,

    openModal: boolean,
    openReceiptModal: boolean,
    errorModal: boolean,
    isLoading: boolean

    closeModal: () => void,
    closeReceiptModal: () => void,
    closeErrorModal: () => void,

    // pin: string
    setPin: Dispatch<SetStateAction<string>>

    amount: number
    receipient?: string
    receiptData?: any
    errorData?: any
}

export type SuccessTransferProps = {
    handleViewReceipt: () => void,
    // openModal: boolean,
    closeModal: () => void
    amount: number,
    receipient?: string
}

export type ErrorTransferProps = {
    closeModal: () => void
    errorData: any
}

export type EnterUsernameProps = {
    handleStepChange: ( x:string ) => void
    username: string
    setUsername: Dispatch<SetStateAction<string>>
    beneficiaries?: Array<BeneficiaryType>,
    searchSuccess: boolean
    isLoading: boolean
    searchError: any
    handleSearchUsername: () => any
}

export type EnterBankAccountProps = {
    handleStepChange: ( x:string ) => void,
    beneficiaries?: Array<BeneficiaryType>,
    banksList: Array<any>,
    handleAccountSearch: () => any,
    accountNumber: string,
    setAccountNumber: Dispatch<SetStateAction<string>>,
    bank?: BankOptionType | null,
    setBank: Dispatch<SetStateAction<BankOptionType | null>>
    activeAccount: BankAccount | null
    setActiveAccount: Dispatch<SetStateAction<BankAccount | null>>
}

export type BankAccount = {
    account_name: string,
    account_number: string,
    bank_id?: number
}

export type EnterAmountProps = {
    handleStepChange: ( x:string ) => void
    amount?: number,
    setAmount: Dispatch<SetStateAction<number>>
    narration: string,
    setNarration: Dispatch<SetStateAction<string>>
    receipient?: string
    logo?: string
}

export type ConfirmTransactionProps = {
    handleStepChange: ( x:string ) => void
    receipient?: string
    amount: number
    name: string
}


// Add Money 

export type CardListProps = {
    handleStepChange: ( x:string ) => void
}

export type CardDepositAmountProps = {
    handleStepChange: ( x:string ) => void
}

export type ProfileType = {
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    phone_number?: string,
    username?: string,
    account_tier?: string,
    profile_image?: string,
    referral_code?: string,
    transactions?: TransactionsType,
    beneficiaries?: Array<BeneficiaryType>
    accountDetails?: AccountDetailsType
    // [key: string]: string | number | undefined
}

export type TransactionType = {
    id: string,
    reference: string,
    type: string,
    kind: string,
    amount: number,
    status: string,
    narration: string,
    account_id: string,
    account_name: string,
    account_number: string,
    bank: string,
    bank_code: number,
    biller_code: number | null,
    biller_id: string | null,
    biller_payment_ref: null,
    user_id: string,
    created_at: string,
    updated_at: string
    fee: string
    metadata: any
    mode: string
    nibbs_session_id: any
}

export type TransactionsType = {
    result_per_page: number,
    last_record_index: string,
    result: Array<TransactionType>
}

export type BeneficiaryType = {
    id: string,
    account_id: string | null,
    account_name: string,
    account_number: number,
    bank: string,
    bank_code: number,
    user_id: number,
    is_internal: boolean,
    created_at: string,
    updated_at: string,
    username: string
}

export type AccountDetailsType = {
    account_block_code: string | number | null,
    account_limit: string,
    account_name: string,
    account_number: string,
    amount_blocked: boolean | null,
    avaliable_balance: number,
    balance: number,
    bank_client_id: number,
    bank_resource_id: number,
    bank_savings_id: number,
    blocked: boolean,
    bvn: string | number,
    created_at: string,
    id: string,
    updated_at: string,
    user_id: string,
    woodcore_acct_no: string,
}

export type BankOptionType = {
    name: string,
    slug: string,
    code: string,
    ussd: string,
    logo: string,
}