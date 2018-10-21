import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { ListItem } from 'modules/items/components';
import { ContainerTemplate, Loader } from 'modules/global/components';

import getUserMovies from 'gql/movies/getUserMovies.gql';
import removeMovie from 'gql/movies/removeMovie.gql';
import completeMovie from 'gql/movies/completeMovie.gql';

import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';

import styles from './Movies.mod.css';
export class Movies extends PureComponent {
  static displayName = 'Movies';

  goToItemDetail = id => this.props.history.push(`/item-detail/movie/${id}`);

  updateList = (cache, userId, id) => {
    const data = cache.readQuery({
      query: getUserMovies,
      variables: {
        userId: this.props.user.userId
      }
    });

    cache.writeQuery({
      query: getUserMovies,
      variables: {
        userId: this.props.user.userId
      },
      data: {
        getUserMovies: data.getUserMovies.filter(li => li.id !== id)
      }
    });
  };

  handleDeleteItem = async id => {
    await this.props.client.mutate({
      mutation: removeMovie,
      variables: { id },
      refetchQueries: [
        {
          query: getUserLastItems,
          variables: {
            userId: this.props.user.userId
          }
        }
      ],
      update: (cache, { data: { removeMovie } }) => {
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
      <ContainerTemplate title={<div>MOVIES</div>}>
        <Query
          variables={{ userId: this.props.user.userId }}
          query={getUserMovies}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <p>Error :(</p>;

            return data.getUserMovies.map(movie => (
              <ListItem
                key={movie.id}
                id={movie.id}
                images={movie.film.images}
                title={movie.film.title}
                completed={movie.completed}
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
)(Movies);
