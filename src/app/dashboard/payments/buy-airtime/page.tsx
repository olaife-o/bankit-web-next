"use client"

import { useState } from "react";
import CustomSelect from "@/app/components/general/custom-select"
import CustomButton from "@/app/components/general/custom-button";


const BuyAirtime = () => {

    const [selectedValue, setSelectedValue] = useState("");

    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    return (

        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-main-black"> 
                        Airtime
                    </h3>
                    <p className="text-main-grey ">Recharge your phone directly with Bankit</p>
                </div>

                <div className="bg-white rounded-3xl w-full p-6">
                    <CustomSelect placeHolderText="Select Network" options={options} value={selectedValue} onChange={setSelectedValue} />

                    <div className="my-6">
                        <label htmlFor="phone_number" />
                        <input type="text" name="phone_number" placeholder="Phone Number" className="bg-bg-input rounded-lg px-4 py-4 w-full" />
                    </div>

                    <div>
                        <label htmlFor="amount" />
                        <input type="text" name="amount" placeholder="Amount" className="bg-bg-input rounded-lg px-4 py-4 w-full" />
                    </div>

                    <div className="mt-10">
                        <CustomButton text="Proceed" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BuyAirtime;