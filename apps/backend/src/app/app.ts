import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RoutesConfig } from './config/routes.config';
import * as helmet from 'helmet';
import * as cors from 'cors';

class App {
  public app: express.Application;
  public routePrv: RoutesConfig = new RoutesConfig();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
