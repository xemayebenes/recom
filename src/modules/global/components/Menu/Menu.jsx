import React from 'react';
import classnames from 'classnames';
import { MenuItem } from 'modules/global/components';

import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import faList from '@fortawesome/fontawesome-free-solid/faThList';

import styles from './Menu.mod.css';

const Menu = props => (
  <div className={classnames(styles.menu, 'my-2', 'my-md-0')}>
    <MenuItem
      route={'/'}
      icon={faHome}
      label={'HOME'}
      className="ml-0 ml-md-5"
    />
    <MenuItem route={'/movies'} icon={faFilm} label={'MOVIES'} />
    <MenuItem route={'/series'} icon={faTv} label={'SERIES'} />
    <MenuItem route={'/lists'} icon={faList} label={'LISTS'} />
  </div>
);

Menu.displayName = 'Menu';

Menu.propTypes = {};
export default Menu;
