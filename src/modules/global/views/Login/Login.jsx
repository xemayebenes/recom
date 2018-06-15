import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { LoginForm } from 'modules/global/components';

export class Login extends PureComponent {
  static displayName = 'Login';

  static propTypes = {};

  state = {};

  render() {
    return (
      <Fragment>
        <div> Login </div>
        <LoginForm />
      </Fragment>
    );
  }
}

export default injectIntl(Login);
