import Image from "next/image"

import Naira from '@/../public/naira.svg'
import Link from "next/link"
import Copy from '@/../public/copy-icon.svg'
import { copyToClipboard } from "@/lib/utils/utils"
import { StaticImport } from "next/dist/shared/lib/get-img-props"


type ViewCardAmountProps = {
    img?: StaticImport | any,
    name: string,
    amount: string,
    hidden: boolean,
    accountNumber: string,
}

type ViewCardServiceProps = {
    img?: StaticImport | any,
    mainText: string,
    subText: string,
    url: string
}


export const ViewCardAmount = ({ name, amount, hidden, accountNumber }: ViewCardAmountProps) => {
    const amountArr = amount.split('.')
    console.log(amountArr, amount)

    const handleCopy = async () => {
        copyToClipboard(accountNumber)
    }
    return(
        <div className='p-3 bg-white flex flex-col gap-2 rounded-xl w-[31%] max-w-[350px]'>
            {/* <Image src={img} alt='avatar' width={30} height={30}/> */}
            <div className="flex justify-between items-center">
                <span className='text-sm text-main-black font-bold '>{ name }</span>
                <div className="flex gap-2 items-center">
                    {
                        accountNumber && name === 'Lifestyle' ? (
                            <>
                                <span className="text-xs text-main-grey">{ accountNumber }</span>
                                <Image src={Copy} alt="copy to clipboar icon" onClick={handleCopy} width={15} height={15} className="cursor-pointer"/>
                            </>
                        ) : (
                            // <>
                            //     <p className="text-xs text-main-grey">1234567890</p>
                            //     <Image src={Copy} alt="copy to clipboar icon" onClick={handleCopy} width={15} height={15}/>
                            // </>
                            ""
                        )
                    }
                    
                </div>
            </div>
            
            {
                name !== 'Lifestyle' ? (
                    <p className="w-full text-center font-bold text-main-grey text-sm my-auto">
                        Coming Soon
                    </p>
                ) : (
                    <>
                        {/* <div className="flex justify-between">
                            {
                                accountNumber && (
                                    <>
                                        <span>{ accountNumber }</span>
                                        <Image src={Copy} alt="copy to clipboar icon" onClick={handleCopy}/>
                                    </>
                                )
                            }
                            <p className="text-xs text-main-grey">12345678</p>
                        </div> */}
                        <div className='flex gap-1'>
                            <Image src={Naira} alt='naira' width={15} height={15} />
                            {
                                hidden ? (
                                    amount === undefined || amount === "undefined" ? (
                                        <p className="text-nav-active leading-tight text-[30px] font-bold">
                                            {`----`}
                                            {/* 100,000. */}
                                            {/* <span className="text-xs">{"--"}</span> */}
                                        </p>
                                        
                                    ) :(
                                        <p className="text-nav-active leading-tight text-[30px] font-bold">
                                            {`${amountArr[0]}.`}
                                            <span className="text-2xl">{amountArr[1]}</span>
                                        </p>
                                    )
                                    
                                ) : <p className="text-nav-active leading-tight text-[30px] font-bold">****</p>
                            }

                
                        </div>
                    </>
                )
            }
        </div>
    )
}

export const ViewCardService = ({ mainText, subText, img, url }: ViewCardServiceProps) => {

    return (
        <Link href={url} className="w-[31%] max-w-[350px]">
            <div className='p-3 bg-white flex flex-col gap-2 rounded-xl'>
                <Image src={img} alt='add service' width={30} height={30} />
                <span className='text-[14px] leading-tight text-main-black font-bold'>{ mainText }</span>
                <span className='text-[12px] leading-tight text-main-grey'>
                    { subText }
                </span>
            </div>
        </Link>
    )
}