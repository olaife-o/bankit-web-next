



import Link from "next/link"
import Image from "next/image"
import { BankOptionType, EnterBankAccountProps } from "@/lib/types/types"

import BeneficiaryListItem from "../beneficiary/beneficiary-list-item"
import CustomButton from "../../general/custom-button"

import SendBankit from '@/../public/send-bankit.svg'
import Right from '@/../public/arrow-right-adornment.svg'
import { ChangeEvent, useEffect, useState } from "react"
import CustomBankSelect from "../../general/custom-bank-select"

const EnterBankAccount = ({ 
    handleStepChange, 
    beneficiaries, 
    banksList, 
    handleAccountSearch, 
    accountNumber, 
    bank, 
    setAccountNumber, 
    setBank,
    activeAccount,
    setActiveAccount
}: EnterBankAccountProps) => {

    const [ selectBankFlag, setSelectBankFlag ] = useState(true)
    // const [ selectedBank, setSelectedBank ] = useState<BankOptionType | null>(null)

    const handleBankSelect = ( option: BankOptionType ) => {
        
        setBank(option)
        setActiveAccount(null)

        if (bank && accountNumber && accountNumber.length === 10) {
            console.log("HandleBankSelect fire")
            // console.log(accountNumber)
            // console.log(bank)
            handleAccountSearch() // Only call this if selectedBank and accountNumber are set
        }
        // console.log(option)
        console.log("activeAccount: ", activeAccount)
        console.log("AccountNumber: ", accountNumber)
        console.log("Bank: ", bank)
        // console.log("SelectedBank: ", selectedBank)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setAccountNumber(e.target.value)
        const newAccountNumber = e.target.value;
        setAccountNumber(newAccountNumber)

        if (accountNumber.length !== 10) {
            // setBank(null)
            setActiveAccount(null)
            // setSelectedBank(null)
        }
        // if (accountNumber.length === 10 && bank !== null) console.log("Search")
        if (newAccountNumber.length === 10 && bank) {
            console.log(newAccountNumber)
            handleAccountSearch()
        }
    }

    // useEffect(() => {
    //     if (bank && accountNumber && accountNumber.length === 10) {
    //         console.log("Use Effect fire")
    //         console.log(accountNumber)
    //         console.log(bank)
    //         handleAccountSearch() // Only call this if selectedBank and accountNumber are set
    //     }
    //     if(accountNumber.length !== 10) setActiveAccount(null)

    // }, [ bank, accountNumber ])

    useEffect(() => {
        console.log("activeAccount: ", activeAccount)
        console.log("AccountNumber: ", accountNumber)
        console.log("Bank: ", bank)
        // console.log("SelectedBank: ", selectedBank)
        // if (accountNumber.length === 10) {
        //     setSelectBankFlag(false)
        // } else {
        //     setSelectBankFlag(true)
        //     setActiveAccount(null)
        // }
        setSelectBankFlag(accountNumber.length !== 10)
        // if(accountNumber.length !== 10) setActiveAccount(null)
    }, [ accountNumber ])

    useEffect(() => {
        
    }, [ activeAccount ])


    return (

        <div className="px-10 py-12 bg-[#F5F5F5] h-auto">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black">
                            Send money to a Bank Account
                        </h3>
                        <p className="text-main-grey ">
                            Send to recepient through their ACC number
                        </p>
                    </div>


                    <div className="bg-white rounded-3xl w-full">

                        <div className=" p-6 gap-4 w-full">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="acc-number" />
                                <input 
                                    type="text" 
                                    name="acc-number" 
                                    placeholder="Account number" className="bg-bg-input rounded-lg px-4 py-4 w-full" 
                                    onChange={handleChange}
                                    value={accountNumber}
                                    maxLength={10}
                                />

                                <CustomBankSelect 
                                    options={banksList} 
                                    onSelect={handleBankSelect} 
                                    disabled={selectBankFlag} 
                                    
                                />

                                <div className="text-main-grey text-lg text-left">
                                    {/* {
                                        activeAccount !== null ? activeAccount.account_name : ""
                                    } */}
                                    {activeAccount ? activeAccount.account_name : ""}
                                </div>



                            </div>


                            <div className="w-full mt-6">
                                <div className="flex justify-between items-center w-[90%] mx-auto">
                                    <span className="text-main-black text-lg font-bold">Beneficiaries</span>
                                    <span className="text-nav-active text-sm font-bold">View all</span>
                                </div>

                                <div className="flex flex-col mt-6 gap-4 w-[90%] mx-auto overflow-y-auto max-h-[300px]">
                                    {
                                        beneficiaries?.map( (item, idx ) => {
                                            let bgC = '';
                                            const name = item.account_name

                                            if (idx % 2 === 0 ){
                                                bgC = '#047E02'
                                            }  else {
                                                bgC = '#9DB8FB'
                                            }
                                            // idx % 2 === 0 ? bgC = '#047E02' : bgC = '#9DB8FB'

                                            while(idx < 10){

                                                return (
                                                    <BeneficiaryListItem
                                                        key={idx}
                                                        bgC={bgC}
                                                        name={name}
                                                        initials={name[0]}
                                                        bank={item.bank}
                                                    />
                                                )
                                            }

                                        }) || <p className='text-main-grey text-center font-bold w-full'>No beneficiaries added yet</p>
                                    }
                                    
                                </div>
                            </div>


                            <div className="w-[90%] mx-auto my-10">
                                <Link href={'/dashboard/payments/send-money/bankit'}>
                                    <div className="flex items-center gap-3 w-full mt-6">
                                        <div>
                                            <Image src={SendBankit} alt="Bankit logo" />
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex flex-col items-start">
                                                <span className="text-main-black text-lg font-medium">Send to Bankit Account</span>
                                                <span className="text-[#7A7A7A] text-[16px]">Send to other Bankit Users</span>
                                            </div>
                                            <div className="">
                                                <Image src={Right} alt="arrow right" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>


                            <div className="my-6 w-full">
                                {/* <Link href={'/dashboard/payments/send-money/bankit/transfer'}> */}
                                    <CustomButton 
                                        handleClick={() => handleStepChange('amount')}
                                        text="Proceed"
                                    />
                                {/* </Link> */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default EnterBankAccount;