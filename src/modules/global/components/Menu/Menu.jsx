import React from 'react';
import classnames from 'classnames';
import { MenuItem } from 'modules/global/components';

import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import styles from './Menu.mod.css';

const Menu = props => (
  <div className={classnames(styles.menu)}>
    <MenuItem route={'/'} icon={faHome} className="ml-5" />
    <MenuItem route={'/movies'} icon={faFilm} />
    <MenuItem route={'/series'} icon={faTv} />
  </div>
);

Menu.displayName = 'Menu';

Menu.propTypes = {};
export default Menu;
