export const priceFormatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const percentFormat = new Intl.NumberFormat('en-US', {
  style: 'percent',
  notation: 'compact',
  maximumFractionDigits: 2,
});

export const priceFormatUSDCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 3,
});
