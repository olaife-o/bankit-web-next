'use client'

import { useState } from "react"


const SignUp = () => {

    const [ steps, setSteps ] = useState(1)

    const handleClick = () => {
        if (steps === 1) {
            setSteps(steps + 1)
            return
        }
    }

    return (
        <main>
            <div className="w-[90%] mx-auto h-screen flex items-center justify-center">
                <div>
                    <div className="flex gap-16">
                        {
                           steps === 1 ?  <EnterPhone handleClick={handleClick} /> : ''
                        }

                        <div>
                            <h2 className="text-[#262626] font-bold text-2xl">
                                Download the Bankit App
                            </h2>
                            <p className="text-[#666666] text-[16px]">
                                Scan the QR code to download the app
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}

type handleClickProps = {
    handleClick: () => void
}

const EnterPhone = ({ handleClick }: handleClickProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-[#262626] font-bold text-4xl mb-4">
                    Let&apos;s get started
                </h1>
                <p className="text-[#666666] text-[16px]">
                    Enter your phone number and we will send you a confirmation code there
                </p>
            </div>

            <div className="flex gap-3">
                <input type="text" placeholder="+234" className="bg-gray-50 w-14 rounded-xl px-2 py-4 text-sm font-medium text-[#808080]"/>
                <input type="phone" placeholder="Phone Number" className="bg-gray-50 w-full rounded-xl px-2 py-4 text-sm font-medium text-[#808080]"/>
            </div>

            <button className="bg-[#062983] rounded-[32px] w-full text-white shadow-btn py-4" onClick={handleClick}>
                Next
            </button>

            <p className="text-sm font-medium text-[#062983]">
                Don’t have an account? <span className="font-bold text-[#245EF5]">Sign up</span>
            </p>
        </div>
    )
}

export default SignUp;