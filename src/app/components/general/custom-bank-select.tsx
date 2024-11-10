
import React, { useState, useRef, useEffect } from 'react';
import { BankOptionType } from "@/lib/types/types";

interface CustomBankSelectProps {
    options: BankOptionType[];
    onSelect: (option: BankOptionType) => void;
    disabled: boolean
    // value: BankOptionType | null
}

const CustomBankSelect: React.FC<CustomBankSelectProps> = ({ options, onSelect, disabled }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<BankOptionType[]>(options);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
  
    // Filter options based on the search term
    useEffect(() => {
      const lowercasedTerm = searchTerm.toLowerCase();
      setFilteredOptions(
        options?.filter(option =>
          option?.name.toLowerCase().includes(lowercasedTerm)
        )
      );
    }, [searchTerm, options]);

  
    // Handle outside click to close the dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // Handle selecting an option
    const handleOptionClick = (option: BankOptionType) => {
      setSearchTerm(option.name);
      onSelect(option);
      setShowDropdown(false);
    };
  
    return (
      <div className="relative w-full" ref={wrapperRef}>
        {/* Search Input */}
        <input
          type="text"
          ref={inputRef}
          value={searchTerm}
          disabled={disabled}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onClick={() => setShowDropdown(true)}
          placeholder="Select a Bank"
        //   className="w-full p-4 border rounded-lg"
          className="bg-bg-input rounded-lg px-4 py-4 w-full disabled:opacity-50"
        />
  
        {/* Dropdown Options */}
        {showDropdown && (
          <ul className="absolute z-10 w-full bg-white border rounded-lg max-h-40 overflow-auto mt-1 text-left">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">No options found</li>
            )}
          </ul>
        )}
      </div>
    );
};

export default CustomBankSelect;