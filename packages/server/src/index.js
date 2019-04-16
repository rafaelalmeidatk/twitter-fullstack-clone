import { port } from './config';
import app from './app';

app.start().then(app => {
  const server = app.listen(port);
  server.on('listening', () => {
    console.log('Listening at port ' + port);
  });
});
