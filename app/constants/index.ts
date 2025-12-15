interface NavItem {
  id: number;
  text: string;
  isActive: boolean;
}

export const nav_items: NavItem[] = [
  { id: 1, text: "Crypto to cash", isActive: true },
  { id: 2, text: "Cash to crypto", isActive: false },
  { id: 3, text: "Crypto to fiat loan", isActive: false },
];

export const paymentMethods = [
  { value: "metamask", label: "Metamask", icon: "/icons/metamask.png" },
  { value: "rainbow", label: "Rainbow", icon: "/icons/rainbow.png" },
  { value: "walletconnect", label: "WalletConnect", icon: "/icons/wc.png" },
  { value: "other", label: "Other Crypto Wallets (Binance, Conibase, Bybit etc)", icon: "/icons/wallet.png" },
];

interface CryptoOption {
  value: string;
  label: string;
  symbol: string;
  icon: any;
}

export const cryptoOptions: CryptoOption[] = [
  {
    value: "CELO",
    label: "USDT-CELO",
    symbol: "CELO",
    icon: "/icons/celo.png",
  },
  {
    value: "TON",
    label: "USDT-TON",
    symbol: "TON",
    icon: "/icons/ton.png",
  },
  {
    value: "BNB",
    label: "USDT-BNB",
    symbol: "BNB",
    icon: "/icons/bnb.png",
  },
];

export const currencyOptions: CryptoOption[] = [
  {
    value: "ngn",
    label: "Nigerian Naira",
    symbol: "NGN",
    icon: "/icons/ngn.png",
  },
];
