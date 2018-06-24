import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import getUserMovie from 'gql/getUserMovie.gql';
import removeMovie from 'gql/removeMovie.gql';
import completeMovie from 'gql/completeMovie.gql';
import getUserLastItems from 'gql/getUserLastItems.gql';

import { MovieData, ActionsPanel } from 'modules/items/components';

export class MovieDetail extends PureComponent {
  static displayName = 'MovieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  handleDeleteItem = async id => {
    const result = await this.props.client.mutate({
      mutation: removeMovie,
      variables: { id },
      update: (cache, { data: { removeMovie } }) => {
        const data = cache.readQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          }
        });
        cache.writeQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          },
          data: {
            getUserLastItems: data.getUserLastItems.filter(
              li => li.item.id !== id
            )
          }
        });
      }
    });

    this.props.history.push('/');
  };
  handleCompleteMovie = async id => {
    const result = await this.props.client.mutate({
      mutation: completeMovie,
      variables: { id },
      update: (cache, { data: { completeMovie } }) => {
        const data = cache.readQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          }
        });
        cache.writeQuery({
          query: getUserLastItems,
          variables: {
            userId: this.props.userId
          },
          data: {
            getUserLastItems: data.getUserLastItems.filter(
              li => li.item.id !== id
            )
          }
        });
      }
    });
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

          return (
            <React.Fragment>
              <ActionsPanel
                onClickDeleteButton={() =>
                  this.handleDeleteItem(data.getUserMovie.id)
                }
                onClickCompleteButton={() =>
                  this.handleCompleteMovie(data.getUserMovie.id)
                }
                completed={data.getUserMovie.completed}
              />
              <MovieData {...film} completed={data.getUserMovie.completed} />
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(MovieDetail);
