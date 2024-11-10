import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";


type PinProps = {
  // pinStr?: string
  setPinStr?: Dispatch<SetStateAction<string>>
}

export default function Pin({ setPinStr }: PinProps) {
  const [otp, setOtp] = useState(Array(4).fill("")); // Array with 6 empty strings
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Array of refs for each input field

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target as HTMLInputElement);
    //   if (index > 0) {
    //     setOtp((prevOtp) => [
    //       ...prevOtp.slice(0, index - 1),
    //       "",
    //       ...prevOtp.slice(index),
    //     ]);
    //     inputRefs.current[index - 1]?.focus();
    //   }

        if (e.key === "Backspace") {
            e.preventDefault();
            if (otp[index] === "" && index > 0) {
            // Move to the previous input if the current one is already empty
            inputRefs.current[index - 1]?.focus();
            } else {
            // Clear the current input and keep the focus on it
            setOtp((prevOtp) => [
                ...prevOtp.slice(0, index),
                "",
                ...prevOtp.slice(index + 1),
            ]);
            }
        }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  useEffect(() => {
    if (setPinStr) setPinStr(otp.join(''))
  }, [ otp ])

  return (
    // <section className="bg-white py-10 dark:bg-dark">
    //   <div className="container">
        <form id="otp-form" className="flex gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              value={digit}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onPaste={handlePaste}
              ref={(el) => {inputRefs.current[index] = el}}
              className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-bg-input p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
            />
          ))}
          {/* You can conditionally render a submit button here based on otp length */}
        </form>
    //   </div>
    // </section>
  );
}
