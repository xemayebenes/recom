import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { LastItems, AuthContext } from 'modules/global/components';
export class Home extends PureComponent {
  static displayName = 'Home';

  render() {
    return (
      <AuthContext.Consumer>
        {authUser => (
          <Fragment>
            <LastItems userId={authUser.userId} />
          </Fragment>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default injectIntl(Home);
