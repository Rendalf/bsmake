const { parse, format } = require('date-fns');

module.exports = {
  formatDate(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'd MMMM yyyy');
  },
  formatMonthYear(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'd MMMM');
  },
};
