import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
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
        {
          // <div className={classnames('pt-1', styles.searchBarContainer)}>
          //   <Col xs={{ size: 8, offset: 3 }}>
          //     <SearchBar userId={authUser.userId} />
          //   </Col>
          // </div>
        }
      </Fragment>
    )}
  </AuthContext.Consumer>
);

Header.displayName = 'Header';

Header.propTypes = {};
export default Header;
