import { ItemDetail, ItemImport } from './views';

export const routes = [
  {
    path: '/item-import/:type/:externalId',
    component: ItemImport,
    authenticatedRequired: true
  },
  {
    path: '/item-detail/:type/:itemId',
    component: ItemDetail,
    authenticatedRequired: true
  }
];
