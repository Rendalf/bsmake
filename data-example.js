module.exports = [
  {
    bankName: 'DBS BANK LTD',
    accountNumber: '1231313',
  
    from: '2020-09-01',
    to: '2020-09-30',
  
    currencyCode: 'SGD',
    openingBalance: 1000,
    closingBalance: 2000,
    withdrawals: 500,
    deposits: 1500,
  
    transactions: [
      ['2020-09-10', 'Insurance', 500, 0, 500],
      ['2020-09-20', 'Payroll', 0, 1500, 2000],
    ],
  },
];
