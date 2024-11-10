"use client"


import CustomButton from "@/app/components/general/custom-button";
import CustomSelect from "@/app/components/general/custom-select";
import { useState } from "react";


const Statements = () => {

    const [selectedValue, setSelectedValue] = useState("");

    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
    ];

    return(
        <div className="px-10 py-12 bg-[#F5F5F5] h-full">
            <div className="w-[50%] text-center mx-auto">
                <div className="mb-6"> 
                    <h3 className="text-2xl font-bold text-main-black"> 
                        Account Statement 
                    </h3>
                    <p className="text-main-grey ">
                        Generate your account statement here
                    </p>
                </div>

                <div className="bg-white rounded-3xl w-full p-6">
                    <CustomSelect options={options} value={selectedValue} onChange={setSelectedValue} placeHolderText="Select account type" />

                    <div className="flex gap-4 my-6">
                        <div className="flex flex-col w-full">
                            <label htmlFor="startDate" className="text-sm font-medium text-gray-600 mb-2">
                                Start Date
                            </label>
                            <input
                                className="bg-gray-50 w-full rounded-xl px-6 py-4 text-sm font-medium text-[#808080]"
                                type="date"
                                name="startDate"
                                id="startDate"
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="startDate" className="text-sm font-medium text-gray-600 mb-2">
                                End Date
                            </label>
                            <input
                                className="bg-gray-50 w-full rounded-xl px-6 py-4 text-sm font-medium text-[#808080]"
                                type="date"
                                name="startDate"
                                id="startDate"
                            />
                        </div>

                    </div>

                    <CustomSelect options={options} value={selectedValue} onChange={setSelectedValue} placeHolderText="Select format type" />


                    <div className="flex gap-4 w-full mt-10">
                        <div className="w-full">
                            <CustomButton text="Cancel" variant="outline" />
                        </div>
                        <div className="w-full">
                            <CustomButton text="Download" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statements;