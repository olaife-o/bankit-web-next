"use client"

import Link from "next/link"
import Image from "next/image"
import { EnterUsernameProps } from "@/lib/types/types"

import BeneficiaryListItem from "../beneficiary/beneficiary-list-item"
import CustomButton from "../../general/custom-button"

import SendBankAcc from '@/../public/send-bank-acc.svg'
import Right from '@/../public/arrow-right-adornment.svg'
import { ChangeEvent, useEffect, useState } from "react"
import CustomLoader from "../../general/custom-loader"

const EnterUsername = ({ handleStepChange, setUsername, beneficiaries, searchSuccess, isLoading, searchError, handleSearchUsername  }: EnterUsernameProps) => {

    const [ hideErr, setHideErr ] = useState<boolean>(true)
    const [ localUsername, setLocalUsername ] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalUsername(e.target.value)
    }

    const handleClick = () => {

        setUsername(localUsername)
        handleSearchUsername()

        if(searchSuccess) handleStepChange('amount');
    }

    useEffect(() => {
        if(searchSuccess) handleStepChange('amount');

    }, [searchSuccess])

    useEffect(() => {
        if (searchError) {
            
            setHideErr(false)

            const timeoutId = setTimeout(() => {
                console.log("searchError timeout")
                setHideErr(true)
            }, 2000)
    
            return () => clearTimeout(timeoutId);
        }
    }, [ searchError ])

    useEffect(() => {
        
    }, [ hideErr ])

    return (

        <div className="px-10 py-6 bg-[#F5F5F5] h-auto">
            <div className="w-[60%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold text-main-black">
                            Send money to a Bankit user
                        </h3>
                        <p className="text-main-grey ">
                            Send to Bankit users with their usernames
                        </p>
                    </div>


                    <div className="bg-white rounded-3xl w-full">

                        <div className=" p-6 gap-4 w-full">
                            <label htmlFor="username" />
                            <input type="text" name="username" placeholder="Recipient Username" className="bg-bg-input rounded-lg px-4 py-4 w-full mb-6" onChange={handleChange} value={localUsername} />

                            {
                                !hideErr && (
                                    <p className="text-red-400 text-xs ">
                                        { searchError?.message }
                                    </p>
                                )
                            }

                            <div className="w-full">
                                <div className="flex justify-between items-center w-[90%] mx-auto">
                                    <span className="text-main-black text-lg font-bold">Beneficiaries</span>
                                    <span className="text-nav-active text-sm font-bold cursor-pointer">View all</span>
                                </div>

                                <div className="flex flex-col mt-6 gap-4 w-[90%] mx-auto max-h-[300px] overflow-y-auto">
                                    {
                                        beneficiaries?.map( (item, idx ) => {
                                            // let bgC = '';
                                            const name = item.account_name

                                            // idx % 2 === 0 ? bgC = '#047E02' : bgC = '#9DB8FB'
                                            

                                            while(idx < 10){

                                                return (
                                                    <BeneficiaryListItem 
                                                        key={ idx }
                                                        bgC={idx % 2 === 0 ? '#047E02' : '#9DB8FB'}
                                                        name={name}
                                                        username={''}
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
                                <Link href={'/dashboard/payments/send-money/others'}>
                                    <div className="flex items-center gap-3 w-full mt-6">
                                        <div>
                                            <Image src={SendBankAcc} alt="Bankit logo" />
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="flex flex-col items-start">
                                                <span className="text-main-black text-lg font-medium">Send to Account</span>
                                                <span className="text-[#7A7A7A] text-[16px]">Send to any Bank  account</span>
                                            </div>
                                            <div className="">
                                                <Image src={Right} alt="arrow right" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>


                            <div className={`my-6 w-full `}>
                                {/* <Link href={'/dashboard/payments/send-money/bankit/transfer'}> */}
                                {
                                    isLoading ? (
                                        
                                        <button disabled={isLoading} className="bg-[#062983] rounded-[32px] w-full text-white shadow-btn py-4 disabled:opacity-40 flex justify-center" >
                                            { <CustomLoader /> }
                                        </button>
                                    ) : (
                                        <CustomButton 
                                            handleClick={handleClick}
                                            text="Proceed"
                                            disabled={localUsername.length < 1}
                                        />
                                    )
                                }
                                    {/* <CustomButton 
                                        handleClick={handleClick}
                                        text="Proceed"
                                    /> */}
                                {/* </Link> */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default EnterUsername;