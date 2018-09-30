const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { id: 1, user: 'brittany storoz', message: 'hi there!' },
  { id: 2, user: 'bob loblaw', message: 'check out my law blog' },
  { id: 3, user: 'lorem ipsum', message: 'dolor set amet' }
];

const addMessage = (newMessage, response) => {
  response.writeHead(201, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(newMessage));
  messages.push(newMessage);
  response.end();
};

const getAllMessages = response => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(messages));
  response.end();
};

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = {
      id: messages.length + 1,
      user: 'alex trebek',
      message: 'answer in the form of a question'
    };

    request.on('data', data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});
