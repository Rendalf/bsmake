const { formatDate, createCurrencyFormatter } = require('./format');

module.exports = function buildDocDefinition (data) {
  const formatCurrency = createCurrencyFormatter(data.currencyCode);
  const formatCurrencyDiff = (amount) => amount === 0 ? '' : formatCurrency(amount);

  return {
    content: [
      {
        columns: [
          {
            text: data.bankName,
          },
          {
            alignment: 'right',
            fontSize: 20,
            text: `Bank statement`,
          },
        ],
      },
      {
        alignment: 'right',
        fontSize: 10,
        text: `from ${formatDate(data.from)} to ${formatDate(data.to)}`,
      },
      {
        alignment: 'right',
        fontSize: 10,
        text: `Account number: ${data.accountNumber}`,
      },
      {
        margin: [0, 20, 0, 0],
        fontSize: 16,
        text: `Account summary`,
      },
      {
        table: {
          headerRows: 0,
          body: [
            ['Opening balance', { text: formatCurrency(data.openingBalance), alignment: 'right' }],
            ['Withdrawals', { text: formatCurrency(data.withdrawals), alignment: 'right' }],
            ['Deposits', { text: formatCurrency(data.deposits), alignment: 'right' }],
            ['Closing balance', { text: formatCurrency(data.closingBalance), alignment: 'right' }],
          ],
        },
      },
      {
        margin: [0, 20, 0, 0],
        fontSize: 16,
        text: `Transactions Details`,
      },
      {
        table: {
          headerRows: 1,
          body: [
            ['Date', 'Details', 'Withdrawals', 'Deposits', 'Balance'],
            ...data.transactions.map(t =>
              [formatDate(t[0]), t[1], formatCurrencyDiff(t[2]), formatCurrencyDiff(t[3]), formatCurrency(t[4])],
            ),
            ['', 'Closing balance', '', '', formatCurrency(data.closingBalance)],
          ],
        },
      },
    ],
    defaultStyle: {
      font: 'Helvetica'
    },
  };
};