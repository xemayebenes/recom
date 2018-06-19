import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';

import styles from './Header.mod.css';

const Header = props => (
  <div className={styles.header}>
    <span className={classnames(styles.title, 'p-3')}>HEADER</span>
  </div>
);

Header.displayName = 'Header';

Header.propTypes = {};
export default Header;
