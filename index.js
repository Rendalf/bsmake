const PdfPrinter = require('pdfmake');
const { parse, format } = require('date-fns');
const fs = require('fs');
const fonts = require('./src/fonts');
const { formatDate, formatMonthYear } = require('./src/formatDate');
const data = require('./data-example');

const docDefinition = {
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
          ['Opening balance', { text: `${data.openingBalance} ${data.currencyCode}`, alignment: 'right' }],
          ['Withdrawals', { text: `${data.withdrawals} ${data.currencyCode}`, alignment: 'right' }],
          ['Deposits', { text: `${data.deposits} ${data.currencyCode}`, alignment: 'right' }],
          ['Closing balance', { text: `${data.closingBalance} ${data.currencyCode}`, alignment: 'right' }],
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
            [formatMonthYear(t[0]), t[1], t[2], t[3], t[4]],
          ),
          ['', 'Closing balance', '', '', data.closingBalance],
        ],
      },
    },
  ],
  defaultStyle: {
    font: 'Helvetica'
  },
};

const printer = new PdfPrinter(fonts);
const pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('bank-statement.pdf'));
pdfDoc.end();
