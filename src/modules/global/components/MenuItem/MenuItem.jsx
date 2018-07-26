import React from 'react';
import classnames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { withRouter } from 'react-router';
import { compose } from 'recompose';

import styles from './MenuItem.mod.css';

const MenuItem = props => (
  <div
    className={classnames(props.className, styles.menuItem)}
    onClick={() => props.history.push(props.route)}
  >
    <FontAwesomeIcon icon={props.icon} />
  </div>
);

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {};
export default compose(withRouter)(MenuItem);
