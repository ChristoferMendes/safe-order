export function useCurrencyConverted() {
  const currencyConverter = (value: number) => {
    const lang = 'en-US';
    const style = 'currency';
    const currency = 'USD';

    const currencyToBeFormated = new Intl.NumberFormat(lang, {
      style,
      currency,
    });

    return currencyToBeFormated.format(value);
  };

  return currencyConverter;
}
