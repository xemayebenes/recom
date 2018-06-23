import querystring from 'querystring';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { compose, setDisplayName, withProps } from 'recompose';
import { Container } from 'reactstrap';
import { loggedIn } from 'utils/security';

import { SideBar, Header, AuthContext } from 'modules/global/components';

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
        <SideBar>
          <Container>{this.props.children}</Container>
        </SideBar>
      </React.Fragment>
    ) : (
      <Redirect
        to={{
          pathname: '/login',
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
