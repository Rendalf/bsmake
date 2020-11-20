const { formatDate, createCurrencyFormatter } = require('./format');
const currencySigns = require('./currencySigns');

module.exports = function buildDocDefinition (data) {
  const { currencyCode } = data;
  const formatCurrency = createCurrencyFormatter(currencyCode);
  const formatCurrencyDiff = (amount) => amount === 0 ? '' : formatCurrency(amount);

  return {
    content: [
      {
        columns: [
          {
            bold: true,
            fontSize: 16,
            lineHeight: 1.2,
            width: 300,
            text: `
              Summary of charges for the periods
              ${formatDate(data.from).toUpperCase()} to ${formatDate(data.to).toUpperCase()}
              Business Bank Account Statement
            `,
          },
          [
            {
              alignment: 'right',
              fontSize: 20,
              lineHeight: 1.2,
              bold: true,
              text: data.bankName,
            },
            {
              alignment: 'right',
              fontSize: 14,
              text: `${data.bankName.toLowerCase().replace(/ /g, '')}.com`,
            },
          ],
        ],
      },
      {
        margin: [0, 30, 0, 0],
        fontSize: 12,
        text: `Your Account Summary`,
        bold: true,
      },
      {
        layout: 'regularTable',
        margin: [0, 10, 0, 0],
        table: {
          headerRows: 0,
          body: [
            [
              { text: `From: ${formatDate(data.from).toUpperCase()}`, bold: true },
              { text: `To: ${formatDate(data.to).toUpperCase()}`, bold: true, alignment: 'right' },
            ],
            [
              { text: 'Business Bank Account number', bold: true },
              { text: data.accountNumber, alignment: 'right' },
            ],
            [
              { text: 'Statement date', bold: true },
              { text: formatDate(data.to).toUpperCase(), alignment: 'right' },
            ],
            [
              { text: 'Opening balance', bold: true },
              { text: formatCurrency(data.openingBalance), alignment: 'right' },
            ],
            [
              { text: 'Total money out', bold: true },
              { text: formatCurrency(data.withdrawals), alignment: 'right' },
            ],
            [
              { text: 'Total money in', bold: true },
              { text: formatCurrency(data.deposits), alignment: 'right' },
            ],
            [
              { text: 'Closing balance', bold: true },
              { text: formatCurrency(data.closingBalance), alignment: 'right' },
            ],
          ],
        },
      },
      {
        margin: [0, 30, 0, 0],
        fontSize: 16,
        text: `Your transactions`,
        bold: true,
      },
      {
        layout: 'regularTable',
        margin: [0, 10, 0, 0],
        table: {
          headerRows: 1,
          widths: [80, 130, 90, 85, 85],
          body: [
            [
              { text: 'Date', bold: true },
              { text: 'Details', bold: true },
              { text: `Money out (${currencySigns[currencyCode]})`, bold: true },
              { text: `Money in (${currencySigns[currencyCode]})`, bold: true },
              { text: `Balance (${currencySigns[currencyCode]})`, bold: true, alignment: 'right' },
            ],
            ...data.transactions.map(t =>
              [
                formatDate(t[0]),
                t[1],
                formatCurrencyDiff(t[2]),
                formatCurrencyDiff(t[3]),
                { text: formatCurrency(t[4]), alignment: 'right' },
            ],
            ),
            [
              '',
              { text: 'Closing balance', bold: true },
              '',
              '',
              { text: formatCurrency(data.closingBalance), alignment: 'right' },
            ],
          ],
        },
      },
    ],
    defaultStyle: {
      font: 'Helvetica'
    },
  };
};