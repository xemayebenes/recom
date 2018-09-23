import React from 'react';
import classnames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { withRouter } from 'react-router';
import { compose } from 'recompose';

import styles from './MenuItem.mod.css';

const MenuItem = props => (
  <div
    className={classnames(props.className, styles.menuItem, {
      [styles.selected]:
        props.location.pathname.indexOf(props.route.substring(1)) > 0
    })}
    onClick={() => props.history.push(props.route)}
  >
    <FontAwesomeIcon icon={props.icon} />
    <span className="pl-1 d-none d-md-block"> {props.label} </span>
  </div>
);

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {};
export default compose(withRouter)(MenuItem);
