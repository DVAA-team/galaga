// import { renderApp } from '@/server/controllers';
import { Router } from 'express';
import { render } from '@/server/middlewares';
import { ROUTES } from '@/routes';

const allRoutes = (function flatRoutes(routesMap: object): string[] {
  return Object.values(routesMap).reduce<string[]>(
    (routes, path) =>
      routes.concat(typeof path === 'object' ? flatRoutes(path) : path),
    []
  );
})(ROUTES);

export const appRoutes = (router: Router) => {
  router.get(allRoutes, render);
};
