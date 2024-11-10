

type BeneficiaryListItemProps = {
    bgC: string;
    name: string;
    initials: string;
    bank?: string;
    username?: string;
}

const BeneficiaryListItem = ({ bgC, name, initials, bank }: BeneficiaryListItemProps) => {

    return (
        <div className="flex items-center gap-4 w-full">
            <div 
                className={`text-white text-[24px] w-[40px] h-[40px] rounded-[50%] flex items-center justify-center`}
                style={{ background: bgC }}
            >
                <span>{ initials }</span>
            </div>
            <div className='flex flex-col items-start gap-1'>
                <span className='text-sm text-main-black font-medium'>
                    { name }
                </span>
                <span className="text-[#7A7A7A] text-sm">
                    { bank }
                </span>
            </div>
        </div>
    )
}

export default BeneficiaryListItem;