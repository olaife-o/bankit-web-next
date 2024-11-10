
import Image from "next/image"

// import RecentTransAvatar from '@/../public/recent-transactions.svg'
import Receive from '@/../public/receive.svg'
import Send from '@/../public/send.svg'

import { TransactionType } from "@/lib/types/types"
import { formatDate } from "@/lib/utils/utils"


interface TransactionUiProps {
    item: TransactionType
}

const TransactionUi = ({ item }: TransactionUiProps) => {
    let colorText = ''

    switch (item.status) {
        case "success":
            colorText = 'text-green-600'
            break;
        case "pending":
            colorText = "text-orange-600"
            break;
        case "reversed": 
            colorText = "text-purple-600"
            break;
        case "failure":
            colorText = "text-red-600"
            break;
        default:
            break;
    }

    return (
        <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
                {
                    item?.mode === 'credit' ? (
                        <Image src={Receive} alt='receive money' width={30} height={30} />
                    ) : (
                        <Image src={Send} alt='send money' width={30} height={30} />
                    )
                }
                <div className='flex flex-col items-start'>
                    <span className='text-main-black text-sm font-semibold'>
                        { item?.account_name || "No Name" }
                    </span>
                    <span className="text-lighter-grey font-medium text-xs">
                        { formatDate(item?.created_at) }
                    </span>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                    <span className={`font-medium text-sm ${item?.mode === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                        {
                            item?.mode === 'debit' ? `-${item?.amount}` : `+${item?.amount}`
                        }
                    </span>
                    <span className={`${colorText} font-medium text-xs `}>
                        {
                            item?.status
                        }
                    </span>
                </div>
        </div>
    )
}

export default TransactionUi