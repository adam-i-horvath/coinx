export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export type CoinDetailProps = {
  id: string;
  priceUsd: number;
  symbol: string;
  marketCapUsd: number;
  rank: number;
  name: number;
  vwap24Hr: number;
  supply: number;
  volumeUsd24Hr: number;
  changePercent24Hr: number;
  maxSupply: number;
  explorer: string;
};

export type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
