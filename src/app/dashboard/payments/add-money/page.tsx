

import Link from "next/link"
import Image from "next/image"

import Bank from '@/../public/bank.svg'
import Card from '@/../public/card.svg'
import Right from '@/../public/arrow-right-adornment.svg'



const AddMoney = () => {


    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-main-black"> Top up your account </h3>
                    <p className="text-main-grey ">Recharge your phone directly with Bankit</p>
                </div>

                <div className="bg-white rounded-3xl w-full p-6">
                    <div className="flex flex-col gap-16">
                        <Link href={'/dashboard/payments/add-money/transfer'}>
                            <div className="flex items-center gap-3 w-full mt-4">
                                <div>
                                    <Image src={Bank} alt="Bank icon" />
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex flex-col items-start">
                                        <span className="text-main-black text-lg font-medium">Bank Transfer</span>
                                        <span className="text-[#7A7A7A] text-[16px]">Add money via bank transfer</span>
                                    </div>
                                    <div className="">
                                        <Image src={Right} alt="arrow right" />
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link href={'/dashboard/payments/add-money/card'}>
                            <div className="flex items-center gap-3 w-full mb-4">
                                <div>
                                    <Image src={Card} alt="Card icon" />
                                </div>
                                <div className="flex justify-between w-full items-center">
                                    <div className="flex flex-col items-start">
                                        <span className="text-main-black text-lg font-medium">Top up via cards</span>
                                        <span className="text-[#7A7A7A] text-[16px]">Add money directly from your bank card</span>
                                    </div>
                                    <div className="">
                                        <Image src={Right} alt="arrow right" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddMoney