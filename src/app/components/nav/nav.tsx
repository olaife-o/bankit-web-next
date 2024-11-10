import Image from "next/image"

import Bankit from '@/../public/bankit-logo.svg'

const Nav = () => {
    return (
        <nav className="w-full">
            <div className="w-[90%] mx-auto py-6 ">
                <Image src={Bankit} alt="Bankit logo" />
            </div>
        </nav>
    )
}

export default Nav