"use client"

import Image from 'next/image'

// import PointsBadge from '@/../public/points-badge.svg'
import NotificationBell from '@/../public/notification-bell.svg'
import AvatarBagde from '@/../public/avatar-badge.svg'
import { useAppSelector } from '@/lib/hooks'
import { ProfileType } from '@/lib/types/types'

const TopNav = () => {

    const profile = useAppSelector( state => state.profile as ProfileType)

    return (
        <div className={`py-3 px-10 text-sm font-medium h-[87px] max-h-[87px]  w-full`}>
            <div className="w-full flex justify-between items-center">
                <div className="flex flex-col gap-4">
                    <h4 className="text-[28px] text-main-black font-bold">
                        Hello { profile?.first_name }
                    </h4>
                    <span className="text-sm text-main-grey">
                        Welcome to Bankit today
                    </span>
                </div>
                <div className='flex gap-4'>
                    {/* <div className=''>
                        <Image src={PointsBadge} alt='points badge' className='mb-4' />
                    </div> */}
                    <div className=' flex items-center'>
                        <Image src={NotificationBell} alt='notification bell' />
                    </div>
                    <div className=' flex items-center'>
                        <Image src={AvatarBagde} alt='avatar' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav;