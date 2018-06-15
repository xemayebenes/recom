import { Login, Home } from './views';

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
  }
];
