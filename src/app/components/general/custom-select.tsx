import Image from "next/image";
import ArrowDown from '@/../public/arrow-down-adornment.svg'
import React, { useState, useRef, useEffect } from "react";


interface OptionType {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  placeHolderText: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeHolderText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle option click
  const handleOptionClick = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  // Find label for the selected value
  const selectedLabel = options.find(option => option.value === value)?.label || placeHolderText;

  return (
    <div className="relative inline-block w-full" ref={selectRef}>
      {/* Selected Option (Clickable) */}
      <div
        // className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none"
        className="flex justify-between items-center bg-gray-50 w-full rounded-xl px-6 py-4 text-sm font-medium text-[#808080]"
        onClick={toggleDropdown}
      >
        <span className="font-medium text-[#B2B2B2] text-sm">{selectedLabel}</span>
        <Image src={ArrowDown} alt="arrow down" />
      </div>

      {/* Dropdown Options with Sliding Animation */}
      <div
        className={`absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto transform transition-all duration-300 ease-out
          ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}
        `}
      >
        {options.map(option => (
          <div
            key={option.value}
            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 text-left ${
              option.value === value ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
