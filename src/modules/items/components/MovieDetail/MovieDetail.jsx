import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import getUserMovie from 'gql/getUserMovie.gql';
import { MovieData } from 'modules/items/components';

export class MovieDetail extends PureComponent {
  static displayName = 'MovieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query
        variables={{ id: this.props.id, userId: this.props.userId }}
        query={getUserMovie}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const film = data.getUserMovie.film;

          return <MovieData {...film} />;
        }}
      </Query>
    );
  }
}

export default injectIntl(MovieDetail);
