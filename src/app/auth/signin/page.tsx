'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from "react";


import Image from "next/image";
import { useRouter } from "next/navigation";

import QR from '@/../public/bankit-qr.png'
import Nav from "@/app/components/nav/nav";

import { useSigninMutation } from "@/lib/api/mutationApi";
import { useGetProfileQuery } from "@/lib/api/queryApi";
import { setToken } from "@/lib/features/token/tokenSlice";
import { setProfile } from "@/lib/features/profile/profileSlice";
import { useAppDispatch } from "@/lib/hooks";
import CustomLoader from "@/app/components/general/custom-loader";

type EnterPhoneProps = {
    handleClick: () => void;
    phoneCode: string;
    phone: string;
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePhoneCodeChange: (e: ChangeEvent<HTMLInputElement>) => void
}

type EnterPasswordProps = {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    password: string;
    handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
}

const SignIn = () => {
    const [ steps, setSteps ] = useState(1)
    const [ phone, setPhone ] = useState('')
    const [ phoneCode, setPhoneCode ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useAppDispatch()
    const router = useRouter()

    // const token = useAppSelector( state => state.token)

    const [
        signinCall,
        {
            data: loginUserData,
            isLoading: loginUserLoading,
            isSuccess: loginUserIsSuccess,
            isError: loginUserIsError,
            error: loginUserError,
        }
    ]= useSigninMutation()

    const {
        data: getProfileData,
        // isLoading: getProfileLoading,
        isSuccess: getProfileIsSuccess,
        // isError: getProfileIsError,
        // error: getProfileError,
        refetch: getProfileReset,
        
    } = useGetProfileQuery(null)


    const handleClick = () => {
        if (steps === 1) {
            setSteps(steps + 1)
            return
        }
    }

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }

    const handlePhoneCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneCode(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const phoneStr = phoneCode.concat(phone)

        const body = {
            phone_number: phoneStr,
            passcode: password
        }

        signinCall(JSON.stringify(body))

        // 07034739318

    }
    
    useEffect(() => {
        if(loginUserIsSuccess) {
            console.log(loginUserIsSuccess, loginUserData, loginUserError, loginUserLoading, loginUserIsError)
            dispatch(setToken(loginUserData?.data?.auth_token))
            getProfileReset()
        } else if(loginUserIsError){
            console.log(loginUserError)
        }
    }, [ loginUserIsSuccess, loginUserIsError])

    useEffect(() => {
        if ( getProfileIsSuccess ) {
            dispatch(setProfile(getProfileData?.data))
            router.push('/dashboard/home')
        }
    }, [ getProfileIsSuccess ])

    // useEffect(() => {
    //     if(token) router.push('/dashboard/home')
    // }, [])
    
    return (
        <main>
            <Nav />
            <div className="w-[90%] mx-auto h-screen flex items-center justify-center">
                <div>
                    <div className="flex gap-16">
                        {
                            steps === 1 ?  
                                <EnterPhone 
                                    handleClick={handleClick}
                                    handlePhoneChange={handlePhoneChange}
                                    handlePhoneCodeChange={handlePhoneCodeChange}
                                    phone={phone}
                                    phoneCode={phoneCode}
                                /> 
                                    :
                                <EnterPassword 
                                    handleSubmit={handleSubmit}
                                    handlePasswordChange={handlePasswordChange}
                                    password={password}
                                    isLoading={loginUserLoading || loginUserIsSuccess}
                                />
                        }

                        <div className="flex flex-col justify-between items-center">
                            <div>
                                <h2 className="text-[#262626] font-bold text-2xl">
                                    Download the Bankit App
                                </h2>
                                <p className="text-[#666666] text-[16px]">
                                    Scan the QR code to download the app
                                </p>
                            </div>
                            <Image src={QR} alt="qr code" />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}


const EnterPhone = ({ handleClick, phoneCode, handlePhoneChange, handlePhoneCodeChange }: EnterPhoneProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-[#262626] font-bold text-4xl mb-4">
                    Welcome Back
                </h1>
                <p className="text-[#666666] text-[16px]">
                    Enter the phone number associated to your Bankit account
                </p>
            </div>

            {/* <form className="flex flex-col gap-8"> */}
            <div className="flex gap-3">
                <input type="text" placeholder="+234" className="bg-gray-50 w-14 rounded-xl px-2 py-4 text-sm font-medium text-[#808080] focus:bg-nav-bg focus:text-main-black" onChange={handlePhoneCodeChange} value={phoneCode}/>
                <input type="phone" placeholder="Phone Number" className="bg-gray-50 w-full rounded-xl px-2 py-4 text-sm font-medium text-[#808080] focus:bg-nav-bg focus:text-main-black" onChange={handlePhoneChange}/>
            </div>

            <button type="submit" className="bg-[#062983] rounded-[32px] w-full text-white shadow-btn py-4" onClick={handleClick}>
                Next
            </button>
            {/* </form> */}

            <p className="text-sm font-medium text-[#062983]">
                Don’t have an account? <span className="font-bold text-[#245EF5]">Sign up</span>
            </p>
        </div>
    )
}


const EnterPassword = ({ handleSubmit, handlePasswordChange, password, isLoading }: EnterPasswordProps) => {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-[#262626] font-bold text-4xl mb-4">
                    Enter your password
                </h1>
                <p className="text-[#666666] text-[16px]">
                    Enter the password associated to your Bankit account
                </p>
            </div>

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <input type="password" placeholder="Password" className="bg-gray-50 w-full rounded-xl px-2 py-4 text-sm font-medium text-[#808080]" onChange={handlePasswordChange} value={password}/>
                </div>

                <button disabled={isLoading} className="bg-[#062983] rounded-[32px] w-full text-white shadow-btn py-4 disabled:opacity-40 flex justify-center" >
                    {
                        isLoading ? <CustomLoader /> : <p>Sign in</p>
                    }
                </button>
            </form>

            <p className="text-sm font-medium text-[#062983]">
                Don’t have an account? <span className="font-bold text-[#245EF5]">Sign up</span>
            </p>
        </div>
    )
}

export default SignIn;;