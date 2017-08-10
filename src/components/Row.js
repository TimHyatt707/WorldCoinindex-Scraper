const { div } = require('elementx');

function Row() {
  const row = div({ class: 'row', id: 'row' });
  return row;
}
module.exports = Row;
