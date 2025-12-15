"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
  symbol: string;
  icon: string;
}

interface CryptoDropdownProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  showSymbol?: boolean;
}

const CryptoDropdown: React.FC<CryptoDropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select",
  searchPlaceholder = "Search...",
  showSymbol = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="select"
      >
        {selectedOption ? (
          <>
            <Image
              src={selectedOption.icon}
              width={30}
              height={30}
              alt={selectedOption.label}
              className="rounded-full"
            />
            <span className="font-semibold">
              {showSymbol ? selectedOption.symbol : selectedOption.label}
            </span>
          </>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown className="text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
          <div className="px-3 pb-2">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50"
                >
                  <Image
                    src={option.icon}
                    width={30}
                    height={30}
                    alt={option.label}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    {option.symbol !== option.label && (
                      <div className="text-xs text-gray-500">{option.symbol}</div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoDropdown;