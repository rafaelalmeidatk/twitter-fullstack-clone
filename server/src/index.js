import { port } from './config';
import app from './app';

app.start({ port }).then(app => {
  const server = app.listen(options.port);
  server.on('listening', () => {
    console.log('Listening at port ' + port);
  });
});
