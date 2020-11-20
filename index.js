const PdfPrinter = require('pdfmake');
const fs = require('fs');
const fonts = require('./src/fonts');
const accs = require('./data-example');
const buildDocDefinition = require('./src/buildDocDefinition');

accs.forEach((acc) => {
  const docDefinition = buildDocDefinition(acc);

  const printer = new PdfPrinter(fonts);
  const pdfDoc = printer.createPdfKitDocument(docDefinition, {
    tableLayouts: {
      regularTable: {
        vLineWidth: () => 0,
        paddingTop: () => 4,
        paddingBottom: () => 4,
      },
    },
  });
  pdfDoc.pipe(fs.createWriteStream(`./output/bank-statement-${acc.accountNumber}.pdf`));
  pdfDoc.end();
});
