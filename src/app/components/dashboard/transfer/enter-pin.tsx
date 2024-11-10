import { EnterPinProps } from "@/lib/types/types"
import Pin from "../../general/pin"
import CustomButton from "../../general/custom-button"
import CustomModal from "../../general/custom-modal"
import SuccessTransfer from "./success-transfer"
import Receipt from "./receipt"
import CustomLoader from "../../general/custom-loader"
import ErrorTransfer from "./error-transfer"



const EnterPin = ({ 
    handleSubmit, 
    closeModal,
    closeReceiptModal,
    closeErrorModal,
    openModal, 
    openReceiptModal,
    errorModal,
    handleViewReceipt,
    // pin,
    setPin,
    receiptData,
    amount,
    receipient,
    isLoading,
    errorData,
}:EnterPinProps) => {

    return (
        <div className="px-10 py-12 bg-[#F5F5F5] h-auto">
            <div className="w-[50%] text-center mx-auto">

                <div className="w-full">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-main-black"> Transaction PIN</h3>
                        <p className="text-main-grey ">Kindly input your transaction PIN</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl w-full">
                    <div className="p-6">
                        <div className="flex justify-center py-6">
                            <Pin setPinStr={setPin} />
                        </div>
                        <div className="mt-5">
                            {
                                isLoading ? (
                                    
                                    <button disabled={isLoading} className="bg-[#062983] rounded-[32px] w-full text-white shadow-btn py-4 disabled:opacity-40 flex justify-center" >
                                        { <CustomLoader /> }
                                    </button>
                                ) : <CustomButton handleClick={ handleSubmit } text="Proceed" />
                            }
                            {/* <CustomButton handleClick={ handleSubmit } text="Proceed" /> */}
                        </div>
                    </div>
                    <CustomModal openModal={openModal} closeModal={closeModal} component={<SuccessTransfer closeModal={closeModal} handleViewReceipt={handleViewReceipt} amount={amount} receipient={receipient} />} />

                    <CustomModal openModal={openReceiptModal} closeModal={closeReceiptModal} component={<Receipt data={receiptData} />} />

                    <CustomModal openModal={errorModal} closeModal={closeErrorModal} component={<ErrorTransfer closeModal={ closeErrorModal } errorData={errorData} />} />
                </div>
                
            </div>
        </div>
    )
}

export default EnterPin;