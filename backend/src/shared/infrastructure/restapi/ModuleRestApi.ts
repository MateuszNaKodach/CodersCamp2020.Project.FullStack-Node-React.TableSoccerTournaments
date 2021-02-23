import { Router } from 'express';

export type ModuleRestApi = {
  readonly path: string;
  readonly router: Router;
};
