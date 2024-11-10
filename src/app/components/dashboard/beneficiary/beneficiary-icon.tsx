


type BeneficiaryIconProps = {
    bgC: string;
    name: string;
    initials: string;
    bank: string
}

const BeneficiaryIcon = ({ bgC, name, initials, bank}: BeneficiaryIconProps) => {

    return (
        <div className="flex flex-col gap-1 justify-center min-w-[100px] text-center">
            
            <div className="flex justify-center">
                <div 
                    className={`text-white text-[16px] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center`}
                    style={{ background: bgC }}
                >
                    <span>{ initials }</span>
                </div>
            </div>
            <span className='text-xs leading-tight text-main-black font-semibold'>
                { name }
            </span>
            <span className="text-[9px] text-main-grey">{ bank }</span>
        </div>
    )
}

export default BeneficiaryIcon;