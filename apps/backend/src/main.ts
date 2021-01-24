import app from './app/app';
import * as mongoose from 'mongoose';
import { mongooseConfig } from './app/config/db.config';

mongoose
  .connect(mongooseConfig.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connexion à la base de donnée des pangolins réussis.');
    initApp();
  })
  .catch(err => {
    console.error('Connexion à la base de donnée des pangolins échoué.', err);
    process.exit();
  });


function initApp() {
  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Pangolin Nation sur le port ${port}!`);
  });
  server.on('error', console.error);
}
