import app, { port } from './app';
import Logger from './core/Logger';

app
  .listen(app.get('port'), () => {
    console.log('App listening on port ' + port);
  })
  .on('error', e => Logger.error(e));
