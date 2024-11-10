
import { ConfirmTransactionProps } from "@/lib/types/types";

import CustomButton from "../../general/custom-button";


const ConfirmTransaction = ({ handleStepChange, receipient, amount, name }:ConfirmTransactionProps) => {
    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-auto">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6 flex items-center gap-4 mx-auto justify-center">
                        <h3 className="text-2xl font-bold text-main-black"> Confirm Transaction</h3>
                    </div>
                </div>

                <div className="bg-white rounded-3xl w-full">
                    <div className="p-6">
                        <div className="flex flex-col gap-3">
                            <span className="text-main-grey text-[16px]">Amount</span>
                            <span className="text-black text-[32px] font-bold">
                                { `N${amount}` }
                            </span>
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-between">
                                    <span className="text-main-grey text-[16px]">From</span>
                                    <span className="text-main-black text-[16px] font-bold">
                                        { name || ''}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-main-grey text-[16px]">To</span>
                                    <span className="text-main-black text-[16px] font-bold">
                                        { receipient || '' }
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-main-grey text-[16px]">Transaction Fee</span>
                                    <span className="text-main-black text-[16px] font-bold">N10.00</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <CustomButton handleClick={() => handleStepChange('pin')} text="Proceed" />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ConfirmTransaction;