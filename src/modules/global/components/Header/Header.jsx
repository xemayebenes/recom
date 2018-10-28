import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { SearchBar } from 'modules/search/components/';
import { AuthContext, Menu, Notifications } from 'modules/global/components';

import styles from './Header.mod.css';

const Header = props => (
  <AuthContext.Consumer>
    {authUser => (
      <Fragment>
        <div
          className={classnames(
            'd-flex',
            'justify-content-between',
            'flex-column',
            'flex-md-row',
            styles.menu
          )}
        >
          <Menu />
          <SearchBar userId={authUser.userId} />

          <Notifications userId={authUser.userId} />
        </div>
      </Fragment>
    )}
  </AuthContext.Consumer>
);

Header.displayName = 'Header';

Header.propTypes = {};
export default Header;
