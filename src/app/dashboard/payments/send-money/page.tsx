"use client"

import Image from "next/image";

import BeneficiaryIcon from "@/app/components/dashboard/beneficiary/beneficiary-icon";

import SendBankit from '@/../public/send-bankit.svg'
import SendBankAcc from '@/../public/send-bank-acc.svg'
import Right from '@/../public/arrow-right-adornment.svg'
import TransactionUi from "@/app/components/dashboard/transaction/transaction";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { ProfileType } from "@/lib/types/types";

const SendMoney = () => {

    const profile = useAppSelector( state => state.profile as ProfileType )
    // const { transactions, beneficiaries } = profile

    return(
        <div className="px-10 py-6 bg-[#F5F5F5]">
            <div className="w-[60%] text-center mx-auto">

                <h3 className="text-2xl font-bold text-main-black  mb-3"> Send Money </h3>


                <div className="bg-white px-6 py-6 flex gap-4 flex-wrap rounded-3xl w-full">
                    <div className="flex justify-between items-center w-full">
                        <span className="text-main-black text-lg font-bold">Beneficiaries</span>
                        <span className="text-nav-active text-sm font-bold">View all</span>
                    </div>

                    <div className="flex mt-2 gap-2 justify-between w-full overflow-x-auto">
                        {
                            profile && profile?.beneficiaries?.map( (item, idx ) => {
                                
                                const name = item.account_name.split(" ")[0]

                                // idx % 2 === 0 ? bgC = '#047E02' : bgC = '#9DB8FB'
                                
                                while (idx < 10) {
                                    return (
                                        <BeneficiaryIcon
                                            key={idx}
                                            bgC={idx % 2 === 0 ? '#047E02' : '#9DB8FB'}
                                            name={item?.account_name}
                                            initials={name[0]}
                                            bank={item.bank}
                                        />
                                    )
                                }

                            }) || <p className='text-main-grey text-center font-bold w-full'>No beneficiaries added yet</p>
                        }
                        
                    </div>

                    <div className="w-[90%] mx-auto">
                        <Link href={'/dashboard/payments/send-money/bankit'}>
                            <div className="flex items-center gap-3 w-full mt-4">
                                <div>
                                    <Image src={SendBankit} alt="Bankit logo" />
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex flex-col items-start">
                                        <span className="text-main-black text-lg font-medium"> Send to any Bankit  user </span>
                                        <span className="text-[#7A7A7A] text-[16px]"> Send to @username or Account number</span>
                                    </div>
                                    <div className="">
                                        <Image src={Right} alt="arrow right" />
                                    </div>
                                </div>
                            </div>
                        </Link>


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

                    <div className="flex justify-between items-center w-[90%] mx-auto mt-8">
                        <span className="text-main-black text-lg font-medium">Transactions</span>
                        <span className="text-nav-active text-sm font-bold cursor-pointer">View all</span>
                    </div>

                    <div className="w-[90%] mx-auto flex flex-col gap-5">
                        {
                            profile && profile?.transactions?.result.map(( item, idx ) => {
                                
                                if(idx < 4) return <TransactionUi key={item.id} item={item} />
                                return null
                            }) || <p className='text-center text-main-grey font-bold my-auto'>No Transactions yet</p>
                        }    
                    
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default SendMoney;