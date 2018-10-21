import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';

import { Query } from 'react-apollo';
import classnames from 'classnames';
import { LastItem } from 'modules/items/components';
import { Loader } from 'modules/global/components';
import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';

import styles from './LastItems.mod.css';

export class LastItems extends PureComponent {
  static displayName = 'LastItems';

  render() {
    return (
      <div className={styles.container}>
        <div
          className={classnames(
            styles['scrolling-wrapper-flexbox'],
            'flex-column',
            'flex-md-row'
          )}
        >
          <Query
            variables={{ userId: this.props.userId }}
            query={getUserLastItems}
          >
            {({ loading, error, data }) => {
              if (loading) return <Loader />;
              if (error) return <p>Error :(</p>;
              return data.getUserLastItems.map(item => (
                <LastItem key={item.item.id} {...item} />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default injectIntl(LastItems);
