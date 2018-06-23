import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query } from 'react-apollo';

import { LastItem } from 'modules/global/components';
import getUserLastItems from 'gql/getUserLastItems.gql';

export class LastItems extends PureComponent {
  static displayName = 'LastItems';

  render() {
    return (
      <Fragment>
        <Query
          variables={{ userId: this.props.userId }}
          query={getUserLastItems}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return data.getUserLastItems.map(item => (
              <LastItem key={item.item.id} {...item} />
            ));
          }}
        </Query>
      </Fragment>
    );
  }
}

export default injectIntl(LastItems);
