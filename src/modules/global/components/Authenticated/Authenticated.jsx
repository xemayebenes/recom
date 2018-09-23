import querystring from 'querystring';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { compose, setDisplayName, withProps } from 'recompose';
import { loggedIn } from 'utils/security';

import { Header } from 'modules/global/components';
import styles from './Authenticated.mod.css';
const generateQueryRedirect = pathname => {
  return querystring.stringify({
    ...(pathname === '/' ? {} : { redirectTo: pathname })
  });
};

export class Authenticated extends PureComponent {
  state = {
    expanded: false
  };

  onToggle = expanded => {
    this.setState({ expanded: expanded });
  };

  render() {
    return this.props.loggedIn ? (
      <React.Fragment>
        <Header />
        <div className={styles.page}>{this.props.children}</div>
      </React.Fragment>
    ) : (
      <Redirect
        to={{
          pathname: '/init',
          search: `?${generateQueryRedirect(this.props.location.pathname)}`
        }}
      />
    );
  }
}

Authenticated.displayName = 'Authenticated';
Authenticated.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  loggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

export default compose(
  setDisplayName('Authenticated'),
  withRouter,
  withProps(() => ({
    loggedIn: loggedIn()
  }))
)(Authenticated);
