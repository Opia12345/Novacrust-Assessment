"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface PaymentMethod {
  value: string;
  label: string;
  icon: string;
}

interface PaymentMethodDropdownProps {
  options: PaymentMethod[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  label: string;
}

const PaymentMethodDropdown: React.FC<PaymentMethodDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  error,
  touched,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="form_input"
        >
          <div className="flex items-center gap-2">
            {selectedOption ? (
              <>
                <Image
                  src={selectedOption.icon}
                  width={30}
                  height={30}
                  alt={selectedOption.label}
                  className="rounded-full"
                />
                <span className="text-gray-900">{selectedOption.label}</span>
              </>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="text-slate-400" />
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
            {options.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => {
                  onSelect(method.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 text-left"
              >
                <Image
                  src={method.icon}
                  width={30}
                  height={30}
                  alt={method.label}
                  className="rounded-full"
                />
                <span className="font-medium text-gray-900">{method.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {touched && error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PaymentMethodDropdown;