"use client";

import React from "react";
import CryptoDropdown from "./CryptoDropdown";

interface Option {
  value: string;
  label: string;
  symbol: string;
  icon: string;
}

interface AmountInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  cryptoOptions: Option[];
  selectedCrypto: string;
  onCryptoSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
  searchPlaceholder?: string;
  showSymbol?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  cryptoOptions,
  selectedCrypto,
  onCryptoSelect,
  error,
  touched,
  searchPlaceholder = "Search...",
  showSymbol = true,
}) => {
  return (
    <div className="border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
      <label className="block text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
        {label}
      </label>
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="text-2xl sm:text-3xl font-semibold bg-transparent border-none outline-none w-1/2 min-w-0"
        />
        <CryptoDropdown
          options={cryptoOptions}
          selectedValue={selectedCrypto}
          onSelect={onCryptoSelect}
          searchPlaceholder={searchPlaceholder}
          showSymbol={showSymbol}
        />
      </div>
      {touched && error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default AmountInput;