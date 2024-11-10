

type ButtonProps = {
    handleClick?: () => void;
    text: string;
    variant?: string
    disabled?: boolean
}

const CustomButton = ({ handleClick, text, variant, disabled }: ButtonProps) => {

    if (variant === 'outline'){
        return(
            <button type="submit" className={`bg-white text-nav-active rounded-[32px] w-full font-bold shadow-md py-4 disabled:opacity-50`} disabled={disabled} onClick={handleClick}>
                { text }
            </button>
        )
    }

    return(
        <button type="submit" className="bg-[#062983] rounded-[32px] w-full text-white font-bold shadow-btn py-4 disabled:opacity-50" disabled={disabled} onClick={handleClick}>
            { text }
        </button>
    )
    
}

export default CustomButton;