import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container } from 'reactstrap';
import { ActionsPanel } from 'modules/items/components';

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
      <Container>
        <Query
          variables={{ userId: this.props.user.userId }}
          query={getUserMovies}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
                <Row>
                  {data.getUserMovies.map(movie => (
                    <Col xs="12" md="6" lg="4" key={movie.id}>
                      <Row>
                        <ActionsPanel
                          onClickDeleteButton={() =>
                            this.handleDeleteItem(movie.id)
                          }
                          onClickCompleteButton={() =>
                            this.handleCompleteMovie(movie.id)
                          }
                          completed={movie.completed}
                        />
                      </Row>
                      <Row>{movie.film.title} </Row>
                      <Row onClick={() => this.goToItemDetail(movie.id)}>
                        <img
                          src={movie.film.images.medium.main}
                          alt="main"
                          className="img-fluid p-2"
                        />
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Fragment>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(Movies);
