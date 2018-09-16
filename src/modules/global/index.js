import {
  Login,
  Home,
  Movies,
  Series,
  UserLists,
  UserList,
  ListForm,
  ImportList
} from './views';

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
  },
  {
    path: '/lists/new',
    component: ListForm,
    authenticatedRequired: true
  },
  {
    path: '/lists/import/:listId',
    component: ImportList,
    authenticatedRequired: true
  },
  {
    path: '/lists/:listId',
    component: UserList,
    authenticatedRequired: true
  },
  {
    path: '/lists',
    component: UserLists,
    authenticatedRequired: true
  }
];
