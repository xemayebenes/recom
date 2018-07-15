import { Login, Home, Movies, Series } from './views';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    authenticatedRequired: true
  },
  {
    path: '/login',
    component: Login,
    authenticatedRequired: false
  },
  {
    path: '/movies',
    component: Movies,
    authenticatedRequired: true
  },
  {
    path: '/series',
    component: Series,
    authenticatedRequired: true
  }
];
