module.exports = {
  bankName: 'DBS BANK LTD',
  accountNumber: '1234567890',

  from: '2020-09-01',
  to: '2020-09-30',

  currencyCode: 'SGD',
  openingBalance: '1,000.00',
  closingBalance: '2,000.00',
  withdrawals: '500.00',
  deposits: '1,500.00',

  transactions: [
    ['2020-09-10', 'Insurance', '500.00', '', '500.00'],
    ['2020-09-20', 'Payroll', '', '1,500.00', '2,000.00'],
  ],
};