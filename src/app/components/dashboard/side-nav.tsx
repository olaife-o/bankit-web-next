'use client'

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

import BankitLogo from '@/../public/bankit-logo-dashboard.svg'
import HomeIcon from '@/../public/home.svg'
import PaymentsIcon from '@/../public/empty-wallet.svg'
import CardsIcon from '@/../public/cards.svg'
import AnalyticsIcon from '@/../public/chart.svg'
import TransactionsIcon from '@/../public/transactions.svg'
import StatementsIcon from '@/../public/receipt.svg'
import SettingsIcon from '@/../public/setting-2.svg'

const links = [
    {
        name: 'Home', 
        href: '/dashboard/home', 
        icon: HomeIcon 
    },
    {
        name: 'Payments', 
        href: '/dashboard/payments', 
        icon: PaymentsIcon 
    },
    {
        name: 'Cards', 
        href: '/dashboard/cards', 
        icon: CardsIcon 
    },
    {
        name: 'Analytics', 
        href: '/dashboard/analytics', 
        icon: AnalyticsIcon 
    },
    {
        name: 'Transactions', 
        href: '/dashboard/transactions', 
        icon: TransactionsIcon 
    },
    {
        name: 'Statements', 
        href: '/dashboard/statements', 
        icon: StatementsIcon 
    },
]

const SideNav = () => {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col h-full items-center w-[272px] px-2 bg-nav-bg">
            <div className="py-4 pl-4
             w-full h-[87px] flex">
                <Image src={BankitLogo} alt=" bankit logo" />
            </div>

            <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-col gap-2 w-full mt-5">
                    {
                        links.map( item => 
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-2 hover:opacity-40 py-3 px-2 text-sm pl-4 ${pathname === item.href || pathname.startsWith(item.href) ? 'bg-white rounded-[4px] text-nav-active font-bold' : 'text-nav-text'}`}
                            >
                                <Image
                                    src={item.icon}
                                    alt={`${item.name} icon`}
                                    
                                />
                                <p className="hidden md:block ">{item.name}</p>
                            </Link>
                        )
                    }
                </div>

                <div>
                    <Link
                        href={'/dashboard/settings'}
                        className={`flex items-center gap-2 hover:opacity-40 py-3 px-2 text-sm pl-4 ${pathname === '/dashboard/settings' || pathname.startsWith('/dashboard/settings') ? 'bg-white rounded-[4px] text-nav-active font-bold' : 'text-nav-text'}`}
                    >
                        <Image
                            src={SettingsIcon}
                            alt={`settings icon`}
                            
                        />
                        <p className="hidden md:block ">Settings</p>
                    </Link>

                    <button
                        className={`flex items-center gap-2 hover:opacity-40 py-3 px-2 text-sm pl-4 text-nav-text`}
                    >
                        <Image
                            src={SettingsIcon}
                            alt={`settings icon`}
                            
                        />
                        <p className="hidden md:block ">Logout</p>
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default SideNav;