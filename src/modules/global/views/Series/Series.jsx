import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { ListItem } from 'modules/items/components';
import { ContainerTemplate, Loader } from 'modules/global/components';

import getUserSeries from 'gql/series/getUserSeries.gql';
import removeSerie from 'gql/series/removeSerie.gql';
import completeMovie from 'gql/movies/completeMovie.gql';

import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';

import styles from './Series.mod.css';
export class Series extends PureComponent {
  static displayName = 'Series';

  goToItemDetail = id => this.props.history.push(`/item-detail/serie/${id}`);

  updateList = (cache, userId, id) => {
    const data = cache.readQuery({
      query: getUserSeries,
      variables: {
        userId: this.props.user.userId
      }
    });

    cache.writeQuery({
      query: getUserSeries,
      variables: {
        userId: this.props.user.userId
      },
      data: {
        getUserSeries: data.getUserSeries.filter(li => li.id !== id)
      }
    });
  };

  handleDeleteItem = async id => {
    await this.props.client.mutate({
      mutation: removeSerie,
      variables: { id },
      refetchQueries: [
        {
          query: getUserLastItems,
          variables: {
            userId: this.props.user.userId
          }
        }
      ],
      update: (cache, { data: { removeSerie } }) => {
        this.updateList(cache, this.props.user.userId, id);
      }
    });
  };
  handleCompleteMovie = async id => {
    await this.props.client.mutate({
      mutation: completeMovie,
      variables: { id },
      refetchQueries: [
        {
          query: getUserLastItems,
          variables: {
            userId: this.props.user.userId
          }
        }
      ]
    });
  };

  render() {
    return (
      <ContainerTemplate title={<div>SERIES</div>}>
        <Query
          variables={{ userId: this.props.user.userId }}
          query={getUserSeries}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <p>Error :(</p>;

            return data.getUserSeries.map(serie => (
              <ListItem
                key={serie.id}
                id={serie.id}
                images={serie.serie.images}
                title={serie.serie.title}
                completed={serie.completed}
                onClickItem={this.goToItemDetail}
                onClickDeleteButton={this.handleDeleteItem}
                onClickCompleteButton={this.handleCompleteMovie}
              />
            ));
          }}
        </Query>
      </ContainerTemplate>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(Series);
