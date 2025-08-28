// import fastify from "fastify";

// const app = fastify();

// app.get('/', (req, res) => {
//   res.send('Hello world');
// })

// app.listen({ port: 5555})
//   .then((address) => {
//     console.log(`Server started at ${address}`)
//   })
//   .catch((err) => {
//     console.log('Server failed to start:', err);
//   })

import express from 'express';

const app = express();

app.use(express.static('build'));

// app.get('/', (req, res) => {
//   res.send('');
// })

const server = app.listen(5555, () => {
  console.log('Server started at 5555');
});

server.on('error', (err) => {
  console.error('Server failed to load:', err)
});
