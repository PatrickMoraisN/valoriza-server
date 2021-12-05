import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.get('/', (request, response) => {
  return response.send('Hello World!');
});

app.post('/', (request, response) => {
  return response.send('Hello World! - POST');
});

app.listen(3000, () => {
  console.log('Server is running!');
});
