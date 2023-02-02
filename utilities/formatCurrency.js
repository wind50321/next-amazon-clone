const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: 'GBP',
  style: 'currency',
});

export default function formatCurrency(number) {
  return currencyFormatter.format(number);
}
