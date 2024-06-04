export const formatCurrency = (value: number) =>
  Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  }).format(value);
