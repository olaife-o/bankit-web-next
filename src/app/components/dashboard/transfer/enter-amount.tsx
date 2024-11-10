
import Image from "next/image"

import { EnterAmountProps } from "@/lib/types/types"

import CustomButton from "../../general/custom-button"

// import BankitLogo from '@/../public/bankit-logo-only.svg'
import { ChangeEvent, useEffect, useState } from "react"




const EnterAmount = ({ handleStepChange, amount, setAmount, narration, setNarration, receipient, logo }: EnterAmountProps) => {

    const [ amountErr, setAmountErr ] = useState('')

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
        
    }

    const handleNarrationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNarration(e.target.value)
    }

    const handleClick = () => {
        if (amount === 0) {
            setAmountErr("Please enter a valid Amount")
            return
        }
        handleStepChange('confirm')
    }

    useEffect(() => {
        console.log(amount, narration)
    }, [amount, narration])

    useEffect(() => {
        if (amountErr) {
            const timeoutId = setTimeout(() => {
                console.log("AmountErr timeout")
                setAmountErr('')
            }, 2000)
    
            return () => clearTimeout(timeoutId);
        }
    }, [ amountErr ])

    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6 flex items-center gap-4 mx-auto justify-center">
                        {
                            logo ? <Image src={logo} alt="bankit logo" width={70} height={70} className="rounded-lg" /> : ''
                        } 
                        <h3 className="text-2xl font-bold text-main-black"> {receipient} </h3>
                    </div>
                </div>

                <div className="bg-white rounded-3xl w-full">
                    <div className="p-6">
                        <div className="flex flex-col gap-4">
                            <label htmlFor="amount" />
                            <input type="text" name="amount" placeholder="Amount" className="bg-bg-input rounded-lg px-4 py-4 w-full" value={amount} onChange={handleAmountChange} />
                            {
                                amountErr && (
                                    <p className="text-red-400 text-xs ">
                                        { amountErr }
                                    </p>
                                )
                            }

                            <label htmlFor="narration" />
                            <input type="text" name="narration" placeholder="Narration" className="bg-bg-input rounded-lg px-4 py-4 w-full" value={narration} onChange={handleNarrationChange} />

                        </div>
                        <div className="mt-6">
                            <CustomButton handleClick={handleClick} text="Proceed" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default EnterAmount; 