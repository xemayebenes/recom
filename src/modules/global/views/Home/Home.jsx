import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { LastItems } from 'modules/items/components';
export class Home extends PureComponent {
  static displayName = 'Home';

  render() {
    return (
      <Fragment>
        <LastItems userId={this.props.user.userId} />
      </Fragment>
    );
  }
}

export default injectIntl(Home);
