import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import classnames from 'classnames';

import { SearchBar } from 'modules/search/components/';
import { AuthContext, Menu, Notifications } from 'modules/global/components';

import styles from './Header.mod.css';

const Header = props => (
  <div className={classnames(styles.header)}>
    <AuthContext.Consumer>
      {authUser => (
        <div>
          <div
            className={classnames(
              'd-flex',
              'justify-content-between',
              styles.menu
            )}
          >
            <Menu />
            <Notifications userId={authUser.userId} />
          </div>
          <Row className={classnames('pt-1', 'mr-5')}>
            <Col xs={{ size: 8, offset: 4 }}>
              <SearchBar userId={authUser.userId} />
            </Col>
          </Row>
        </div>
      )}
    </AuthContext.Consumer>
  </div>
);

Header.displayName = 'Header';

Header.propTypes = {};
export default Header;
