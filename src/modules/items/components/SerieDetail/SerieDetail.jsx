import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import { SerieData } from 'modules/items/components';

import getUserSerie from 'gql/getUserSerie.gql';

export class SerieDetail extends PureComponent {
  static displayName = 'SerieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query
        variables={{ id: this.props.id, userId: this.props.userId }}
        query={getUserSerie}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const serie = data.getUserSerie.serie;

          return <SerieData {...serie} />;
        }}
      </Query>
    );
  }
}

export default injectIntl(SerieDetail);
