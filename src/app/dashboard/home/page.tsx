"use client"

import Image from 'next/image';

// import UpgradeImg from '@/../public/home-upgrade-img.svg'
import Hide from '@/../public/hide-details.svg'
// import Naira from '@/../public/naira.svg'
import AvatarAcc from '@/../public/account-avatar.svg'
import AvatarAcc2 from '@/../public/account-avatar2.svg'
import AvatarAcc3 from '@/../public/account-avatar3.svg'
import Add from '@/../public/plus-icon.svg'
import Send from '@/../public/send-icon.svg'
import Pay from '@/../public/pay-bills-icon.svg'
import Down from '@/../public/down-icon.svg'
import Chart from '@/../public/analytics-chart.svg'
// import RecentTransAvatar from '@/../public/recent-transactions.svg'
import BeneficiaryIcon from '@/app/components/dashboard/beneficiary/beneficiary-icon';
import TransactionUi from '@/app/components/dashboard/transaction/transaction';
import { useGetAccountQuery, useGetBeneficiariesQuery, useGetTxHistoryQuery } from '@/lib/api/queryApi';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { useDispatch } from 'react-redux';
import { setAccountDetails, setBeneficiaries, setTransactions } from '@/lib/features/profile/profileSlice';
import { ViewCardAmount, ViewCardService } from '@/app/components/dashboard/view-card';
import { ProfileType } from '@/lib/types/types';





const cardsAmount = [
    {
        img: AvatarAcc,
        name: 'Lifestyle',
        amount: '100,000.00'
    },
    {
        img: AvatarAcc2,
        name: 'Kiddies',
        amount: '100,000.54'
    },
    {
        img: AvatarAcc3,
        name: 'Business',
        amount: '100,000.00'
    },
]

const cardsService = [
    {
        img: Add,
        mainText: 'Add Money',
        subText: 'Fund your BankIT account through transfer or card deposit',
        url: '/dashboard/payments/add-money'
    },
    {
        img: Send,
        mainText: 'Send Money',
        subText: 'Transfer funds to any account through your BankIT account',
        url: '/dashboard/payments/send-money'
    },
    {
        img: Pay,
        mainText: 'Pay Bills',
        subText: 'Make payment for your airtime, data, electricity, cable TV and more',
        url: '/dashboard/payments/add-money'
    },
]


const Home = () => {

    const [ hideAmount, setHideAmount ] = useState(false)

    // const [ beneficiaries, setBeneficiaries ] = useState()
    // const [ transactions, setTransactions ] = useState()
    // const [ accountDetails, setTransactions ] = useState()

    const dispatch = useAppDispatch()

    const profile = useAppSelector( state => state.profile as ProfileType )
    console.log(profile)

    const {
        data: getAccountData,
        // isLoading: getAccountIsLoading,
        isSuccess: getAccountIsSuccess,
        // isError: getAccountIsError,
        // error: getAccountError,
        refetch: getAccountReset,
    } = useGetAccountQuery(null)

    const {
        data: getBeneficiariesData,
        // isLoading: getBeneficiariesIsLoading,
        isSuccess: getBeneficiariesIsSuccess,
        // isError: getBeneficiariesIsError,
        // error: getBeneficiariesError,
        refetch: getBeneficiariesReset,
    } = useGetBeneficiariesQuery(null)

    const {
        data: getTxHistoryData,
        // isLoading: getTxHistoryIsLoading,
        isSuccess: getTxHistoryIsSuccess,
        // isError: getTxHistoryIsError,
        // error: getTxHistorysError,
        refetch: getTxHistoryReset,
    } = useGetTxHistoryQuery({ total: 100, last: 1 })

    useEffect( () => {
        getAccountReset()
        getBeneficiariesReset()
        getTxHistoryReset()
    }, [])

    useEffect( () => {
        if( getAccountIsSuccess ) dispatch( setAccountDetails(getAccountData.data) )

        if( getBeneficiariesIsSuccess ) dispatch( setBeneficiaries(getBeneficiariesData.data) )

        if( getTxHistoryIsSuccess ) dispatch( setTransactions(getTxHistoryData.data) )
 
    }, [ getAccountIsSuccess, getTxHistoryIsSuccess, getBeneficiariesIsSuccess])

    
    return(
        <div className="bg-dashboard-bg px-10 py-5">
            <div className="">
                {/* {
                    profile && profile?.account_tier == null ? 
                        <div className=''>
                            <Image src={UpgradeImg} alt='upgrade tier' className='w-full'/>
                        </div>
                        :
                        ""
                } */}

                <div>
                    <div className='flex gap-2 items-center'>
                        <h4 className='text-[16px] text-main-black font-bold'>
                            Your Accounts
                        </h4>
                        <div className='flex items-center cursor-pointer' onClick={() => setHideAmount(!hideAmount)}>
                            <Image src={Hide} alt='visibility' />
                        </div>
                    </div>

                    <div className='mt-1 flex justify-between'>
                        {
                            cardsAmount.map( (item, idx) => 
                                <ViewCardAmount key={idx} img={item.img} name={item.name} amount={String(profile?.accountDetails?.avaliable_balance) || item.amount} hidden={hideAmount} accountNumber={profile?.accountDetails?.account_number || ''} />
                            )
                        }
                    </div>
                </div>


                <div className='mt-4'>
                    <div className='flex'>
                        <h4 className='text-[16px] text-main-black font-bold'>
                            Services
                        </h4>
                    </div>
                    <div className='mt-2 flex justify-between'>
                        {
                            cardsService.map((item, idx) => 
                                <ViewCardService key={idx} img={item.img} mainText={item.mainText} subText={item.subText} url={item.url} />
                            )
                        }
                    </div>
                </div>

                <div className='mt-6 flex justify-between items-stretch'>
                    <div className='w-[48%] flex flex-col gap-3'>
                        <div className='rounded-[16px] bg-white p-3 w-full'>
                            <div className='flex items-center justify-between'>
                                <h4 className='text-[16px] text-main-black font-bold'>
                                    Recent Beneficiaries
                                </h4>
                                <span className='text-nav-active text-xs font-medium cursor-pointer'>
                                    View all
                                </span>
                            </div>
                            <div className='mt-3 flex gap-2 justify-between overflow-x-auto w-full'>
                                {
                                    profile && profile?.beneficiaries?.map( (item, idx ) => {
                                        let bgC = '';
                                        const name = item.account_name.split(" ")[0]

                                        // idx % 2 === 0 ? bgC = '#047E02' : bgC = '#9DB8FB'
                                        if (idx % 2 === 0 ){
                                            bgC = '#047E02'
                                        }  else {
                                            bgC = '#9DB8FB'
                                        }
                                        
                                        while(idx < 6){

                                            return (
                                                <BeneficiaryIcon
                                                    key={idx}
                                                    bgC={bgC}
                                                    name={item.account_name}
                                                    initials={name[0]}
                                                    bank={item.bank}
                                                />
                                            )
                                        }

                                    }) || <p className='text-main-grey text-xs text-center font-bold w-full'>No beneficiaries added yet</p>
                                }


                            </div>
                        </div>
                        <div className='bg-white rounded-[16px] p-3'>
                            <div className='flex items-center justify-between mb-4'>
                                <span className='text-[16px] font-bold text-main-black'>
                                    Analytics
                                </span>
                                <div className='flex items-center gap-2'>
                                    <span className='text-xs font-medium text-secondary-grey'>Week</span>
                                    <Image src={Down} alt='down' />
                                </div>
                            </div>
                            <div>
                                <Image src={Chart} alt='chart' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[48%] bg-white p-3 rounded-[16px] flex flex-col gap-4'>
                        <div className='flex items-center justify-between'>
                            <h4 className='text-[16px] text-main-black font-bold'>
                                Recent Transactions
                            </h4>
                            <span className='text-nav-active text-xs font-medium cursor-pointer'>
                                View all
                            </span>
                        </div>
                        <div className='flex flex-col justify-between h-full'>
                            {
                                profile && profile?.transactions?.result.map(( item, idx ) => {
                                    console.log(item)
                                    
                                    if(idx < 6) return <TransactionUi key={idx} item={item} />
                                    return null
                                }) || <p className='text-center text-main-grey font-bold text-xs my-auto'>No Transactions yet</p>
                            }
                                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;