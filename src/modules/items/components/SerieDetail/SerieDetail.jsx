import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { SerieData, ActionsPanel } from 'modules/items/components';

import getUserSerie from 'gql/getUserSerie.gql';
import removeSerie from 'gql/removeSerie.gql';
import completeSerie from 'gql/completeSerie.gql';
import getUserLastItems from 'gql/getUserLastItems.gql';

export class SerieDetail extends PureComponent {
  static displayName = 'SerieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };

  handleDeleteItem = async id => {
    const result = await this.props.client.mutate({
      mutation: removeSerie,
      variables: { id },
      update: (cache, { data: { removeSerie } }) => {
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
      mutation: completeSerie,
      variables: { id },
      update: (cache, { data: { completeSerie } }) => {
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
        query={getUserSerie}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const serie = data.getUserSerie.serie;

          return (
            <React.Fragment>
              <ActionsPanel
                onClickDeleteButton={() =>
                  this.handleDeleteItem(data.getUserSerie.id)
                }
                onClickCompleteButton={() =>
                  this.handleCompleteMovie(data.getUserSerie.id)
                }
                completed={data.getUserSerie.completed}
              />
              <SerieData {...serie} completed={data.getUserSerie.completed} />
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
)(SerieDetail);
