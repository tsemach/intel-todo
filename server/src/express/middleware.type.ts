import * as express from 'express';

export default interface Middleware {
  add(express: express.Application): express.Handler;
}
