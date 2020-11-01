const CODES = {
  A: 65,
  Z: 90,
};

function toCell (content = '') {
  return `<div class="cell" contenteditable="">${content}</div>`;
}

function toColumn (col = '') {
  return `<div class="column">${col}</div>`;
}

function toRow (index = '', content = '') {
  return `
  <div class="row">
        <div class="row-info">${index || ''}</div>

        <div class="row-data">${content}</div>
  </div>
  `;
}

function toChar (code = 65) {
  return String.fromCharCode(code);
}

export function createTable (rowsCount = 15) {
  const codsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(codsCount).fill('').map((_, index) => toColumn(toChar( CODES.A + index))).join('');
  const cells = new Array(rowsCount).fill('').map(() => toCell('')).join('');
  rows.push(toRow(null, cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(toRow(i + 1, cells));
  }

  console.log(rows);
  return rows.join('');
}
