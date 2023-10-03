//módulo util.js com a função createLink:
const path = require('path'); // Importe o módulo path

function createLink(dir, file) {
  const filePath = path.join(dir, file);
  const encodedPath = encodeURIComponent(filePath);
  return `<a href="/file/${encodedPath}">${file}</a><br>\n`;
}

function voltar() {
  return '<a href="/list">Voltar</a>';
}

module.exports = {
  createLink,
  voltar,
};