import * as express from 'express';

export default interface Service {
  add(express: any): express.Router;
}
