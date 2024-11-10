
import Image from 'next/image'

import AddMoney from '@/../public/add-money.svg'
import SendMoney from '@/../public/send-money.svg'
import BuyAirtime from '@/../public/buy-airtime.svg'
import BuyData from '@/../public/buy-data.svg'
import CableTv from '@/../public/cable-tv.svg'
import Electricity from '@/../public/electricity.svg'
import Link from 'next/link'

const data = [
    {
        icon: AddMoney,
        header: "Add Money",
        body: "Fund your BankIT account through transfer or card deposit ",
        href: "/dashboard/payments/add-money"
    },
    {
        icon: SendMoney,
        header: "Send Money",
        body: "Transfer funds to any account through your BankIT account",
        href: "/dashboard/payments/send-money"
    },
    {
        icon: BuyAirtime,
        header: "Buy Airtime",
        body: "Make payment for your airtime, data, electricity, cable TV and more",
        href: "/dashboard/payments/buy-airtime"
    },
    {
        icon: BuyData,
        header: "Buy Data",
        body: "Make payment for your airtime, data, electricity, cable TV and more",
        href: "/dashboard/payments/"
    },
    {
        icon: CableTv,
        header: "Cable TV",
        body: "Make payment for your airtime, data, electricity, cable TV and more",
        href: "/dashboard/payments/"
    },
    {
        icon: Electricity,
        header: "Electricity",
        body: "Make payment for your airtime, data, electricity, cable TV and more",
        href: "/dashboard/payments/"
    },
    
]

const Payments = () => {
    return(
        <div className="p-10 bg-[#F5F5F5] h-full">
            <div className="bg-white p-6 flex gap-8 flex-wrap w-full">
                    {
                        data.map( (item, idx) => 
                            <div key={`${idx}-${item.header}`} className=' w-[20%] my-8'>
                                <Link href={item.href}>
                                    <div>
                                        <Image src={item.icon} alt={item.header} />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='text-main-black font-bold text-[16px]'>{ item.header }</h3>
                                        <p className='text-main-grey text-sm mt-2'>
                                            { item.body }
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}

export default Payments;