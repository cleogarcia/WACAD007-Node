/*Exercício 1 2 3.....
• Usando a função readdir do módulo fs, desenvolva um programa
que aceita o nome de um diretório como parâmetro, então cria um
servidor Web capaz de retornar uma página contendo a lista de
arquivos e subdiretórios do diretório informado*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // solicitação  
  if (req.method === 'GET' && req.url.startsWith('/list')) {
    // Obtém o diretório especificado na URL (após '/list/')
    const dir = path.join(__dirname, req.url.slice(6));

    // UsAND O fs.readdir para listar Arquivos e subdiretórios
    fs.readdir(dir, (err, files) => {
      if (err) {
        // Se ACONTECER um erro ao ler o diretório, vai mostraruma msg de erro
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Erro ao listar diretório.');
      } else {
        // Se leitura bem-sucedida, vai criar lista HTML
        const fileList = files.map((file) => `<li>${file}</li>`).join('');
        const html = `<html><body><ul>${fileList}</ul></body></html>`;

        // Retorna a lista na resposta HTTP
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
      }
    });
  } else {
    // Se a URL não corresponder a '/list', retorna uma resposta de "Página não encontrada"
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Página não encontrada.');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});