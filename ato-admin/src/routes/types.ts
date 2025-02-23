import { ReactNode } from 'react';

export type TRouteItem = {
  path: string;
  element: ReactNode;
};

export type TRoute = {
  path: string;
  element: ReactNode;
  children: TRouteItem[];
};
