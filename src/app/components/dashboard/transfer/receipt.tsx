import Image from "next/image"

import SuccessIcon from '@/../public/success-icon.svg'



const Receipt = ({ data }: any) => {
    return (
        <div className="bg-[#F5F5F5] w-[462px] rounded-3xl p-8">
            <div>
                <div className="flex justify-center">
                    <Image src={SuccessIcon} alt="success" />
                </div>
                <div className="my-6">
                    <h3 className="text-2xl font-bold text-main-black"> Payment Successful</h3>
                    <p className="text-main-grey mt-2">Your payment has been successfully completed</p>
                </div>
            </div>
            <hr className="bg-[#E6E6E6] h-1"/>
            {/* <div className=""> */}
                <div className="flex flex-col gap-3 mt-4">
                    <span className="text-black text-[32px] font-bold mb-4">N{ data?.amount }</span>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">Transaction Type</span>
                            <span className="text-main-black text-[16px] font-bold">{data?.kind}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">Recepient Acc Number</span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.account_number }</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">Payment Method</span>
                            <span className="text-main-black text-[16px] font-bold">Bank Transfer</span>
                        </div>

                        {/* <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">
                                Receipient Acc Name
                            </span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.account_name}</span>
                        </div> */}

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">
                                Receipient
                            </span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.account_name}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">
                                Description
                            </span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.narration}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">
                                Reference ID
                            </span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.reference}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-main-grey text-[16px]">
                                Status
                            </span>
                            <span className="text-main-black text-[16px] font-bold">{ data?.status}</span>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Receipt