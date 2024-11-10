
import Image from "next/image";

import CustomButton from "@/app/components/general/custom-button";

import EmptyCardsIcon from '@/../public/empty-cards.svg'
import { CardListProps } from "@/lib/types/types";

const EmptyCards = ({ handleStepChange }: CardListProps) => {
    return(
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black"> Top up your account</h3>
                        <p className="text-main-grey "> Add funds to your account via cards </p>
                    </div>


                    <div className="bg-white rounded-3xl w-full p-8">
                        <div>
                            <div className="flex justify-center">
                                <Image src={EmptyCardsIcon} alt="Empty cards" />
                            </div>
                            <div className="flex flex-col mt-4">
                                <span className="font-bold text-[16px] text-main-black">
                                    No added card here yet
                                </span>
                                <span className="text-[#A6A6A6] mt-1">
                                    You currently do not have any card linked to your account yet, kindly add a card 
                                </span>
                            </div>
                        </div>

                        <div className="mt-5" onClick={() => handleStepChange('new-card')}>
                            <CustomButton text="Add New Card Details" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmptyCards