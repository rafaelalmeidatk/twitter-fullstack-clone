import { port } from './config';
import app from './app';

app.start({ port }).then(server => {
  console.log('Listening at port ' + port);
});
