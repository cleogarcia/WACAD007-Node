const http = require('http');
const fs = require('fs');
const path = require('path');
const { createLink, voltar } = require('./util.js'); // Importe as funções createLink e voltar

const server = http.createServer((req, res) => {
  // Método da solicitação
  if (req.method === 'GET') {

    if (req.url === '/' || req.url === '/list') {
      // trás o diretório especificado na URL (após '/list/')
      const dir = path.join(__dirname, req.url.slice(6) || './public');

      // Usando fs.readdir para listar arquivos e subdiretórios do diretório
      fs.readdir(dir, (err, files) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao listar diretório.');
        } else {
          // Se a leitura do diretório for bem, cria uma lista HTML com links
          const fileList = files.map((file) => createLink(dir, file)).join('');
          const html = `<html><body><h1>Exercício V, Lista de Arquivos </h1><ul>${fileList}</ul></body></html>`;

          res.writeHead(200,{ 'Content-Type': 'text/html;charset=utf-8'})
          res.end(html);
        }
      });
    } else if (req.url.startsWith('/file/')) {
      // Se a URL corresponder a '/file/', link para um arquivo
      const filePath = decodeURIComponent(req.url.slice(6));
      fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Erro ao ler arquivo.');
        } else {
          // Adicione um link "Voltar" para a página de listagem
          const linkBack = '<a href="/list">Voltar</a>';
          const pageContent = `${linkBack}<br><pre>${content}</pre>`;

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(pageContent);
        }
      });
    } else {
      // Se a URL não corresponder a '/list' ou '/file/', retorna uma resposta de "Página não encontrada"
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Página não encontrada.');
    }
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});