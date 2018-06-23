import { routes as views } from './global';
import { routes as itemsViews } from './items';
export const routes = [...views, ...itemsViews];
