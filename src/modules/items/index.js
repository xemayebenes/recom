import { ItemDetail } from './views';

export const routes = [
  {
    path: '/item-detail/:type/:itemId',
    component: ItemDetail,
    authenticatedRequired: true
  }
];
