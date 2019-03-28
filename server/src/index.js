import express from 'express';
import db from './db';

const app = express();

app.get('/', (req, res) => {
  db('users')
    .first()
    .then(res => {
      console.log(' res', res);
    });

  res.send('hello!');
});

app.listen(4000, () => {
  console.log('Listening at port 4000');
});
