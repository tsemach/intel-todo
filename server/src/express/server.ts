import createLogger from 'logging'; 
const logger = createLogger('Server');

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import Service from './service.type';
import Middleware from './middleware.type';

export default class Server {
  private static _instance: Server = new Server();

  public app: express.Application = express();
    
  private constructor() {     
    const { NODE_ENV = "development" } = process.env;
    logger.info(`SERVER: env = ${NODE_ENV} _dirname=${__dirname + '/../../../client/dist/'}`);

    if (NODE_ENV === 'production') {
      this.use(express.static(__dirname + '/../../../client/dist/'));
    }
    this.use(this.logger)
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({extended: false}));

    this.app.use(cors({origin: '*'}));
  }

  public static get instance() {
    return Server._instance || (Server._instance = new Server());    
  }
  
  private logger(req: express.Request, res: express.Response, next: express.NextFunction) {
    // logger.info("request:", JSON.stringify(req, undefined, 2));
    next()
  }

  public init(middlewares: Middleware[]): void { 
    if (middlewares) {
      middlewares.forEach(m => {
        this.use(m);  
      });
    }
  }

  use(middleware: any) {
    this.app.use(middleware);
  }

  middleware(where: string, middleware: Middleware) {
    logger.info("going to add middleware at: " + where);
    this.app.use(where, middleware.add(this.app));
  }

  /**
   * Services are all to add their routes into express application
   *    
   * @param where - thed of which the service is route (regular express path)
   * @param service - a class which implement this route
   */
  route(where: string, service: Service) {
    logger.info("going to add service at: " + where);
    this.app.use(where, service.add(this.app));
  }

  listen(host: string, port: number) {
    this.app.listen(port, () => {
      // success callback
      console.log(`Listening at http://${host}:${port}/`);
    });
  }
}


