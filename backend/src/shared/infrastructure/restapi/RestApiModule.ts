import { Router } from 'express';

export type RestApiModule = {
  readonly path: string;
  readonly router: Router;
};
