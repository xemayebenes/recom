import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { SearchBar } from 'modules/search/components/';
import { AuthContext } from 'modules/global/components';

import styles from './Header.mod.css';

const Header = props => (
  <div
    className={classnames(
      'd-flex',
      'flex-row',
      'justify-content-center',
      styles.header
    )}
  >
    <AuthContext.Consumer>
      {authUser => (
        <React.Fragment>
          <SearchBar userId={authUser.userId} />
          <span className={classnames(styles.title, 'p-3')}>HEADER</span>
        </React.Fragment>
      )}
    </AuthContext.Consumer>
  </div>
);

Header.displayName = 'Header';

Header.propTypes = {};
export default Header;
