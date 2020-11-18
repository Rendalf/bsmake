const { parse, format } = require('date-fns');
const currencySigns = require('./currencySigns');

module.exports = {
  formatDate (date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'd MMM yyyy');
  },

  createCurrencyFormatter (currencyCode) {
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
    });

    return (amount) => formatter.format(amount).replace(`$`, currencySigns[currencyCode]);
  },
};
