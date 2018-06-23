import { Login, Home, ItemDetail } from './views';

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
    path: '/item-detail/:type/:itemId',
    component: ItemDetail,
    authenticatedRequired: true
  }
];
