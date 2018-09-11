import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import { ActionsPanel } from 'modules/items/components';

import getList from 'gql/getList.gql';
import getLists from 'gql/getLists.gql';
import removeItemFromList from 'gql/removeItemFromList.gql';
// import completeMovie from 'gql/completeMovie.gql';
//
// import getUserLastItems from 'gql/getUserLastItems.gql';

export class Movies extends PureComponent {
  static displayName = 'Movies';

  goToItemDetail = (id, type) => {
    const route = `/item-detail/${type.toLowerCase()}/${id}`;
    this.props.history.push(route);
  };
  // updateList = (cache, userId, id) => {
  //   const data = cache.readQuery({
  //     query: getUserMovies,
  //     variables: {
  //       userId: this.props.user.userId
  //     }
  //   });
  //
  //   cache.writeQuery({
  //     query: getUserMovies,
  //     variables: {
  //       userId: this.props.user.userId
  //     },
  //     data: {
  //       getUserMovies: data.getUserMovies.filter(li => li.id !== id)
  //     }
  //   });
  // };

  handleDeleteItem = async id => {
    // await this.props.client.mutate({
    //   mutation: removeMovie,
    //   variables: { id },
    //   refetchQueries: [
    //     {
    //       query: getUserLastItems,
    //       variables: {
    //         userId: this.props.user.userId
    //       }
    //     }
    //   ],
    //   update: (cache, { data: { removeMovie } }) => {
    //     this.updateList(cache, this.props.user.userId, id);
    //   }
    // });
  };
  handleRemoveItemFromList = async id => {
    await this.props.client.mutate({
      mutation: removeItemFromList,
      variables: { itemId: id, listId: this.props.match.params.listId },
      refetchQueries: [
        {
          query: getLists,
          variables: {
            userId: this.props.user.userId
          }
        }
      ]
      // update: (cache, { data: { removeMovie } }) => {
      //   this.updateList(cache, this.props.user.userId, id);
      // }
    });
  };
  handleCompleteMovie = async id => {
    // await this.props.client.mutate({
    //   mutation: completeMovie,
    //   variables: { id },
    //   refetchQueries: [
    //     {
    //       query: getUserLastItems,
    //       variables: {
    //         userId: this.props.user.userId
    //       }
    //     }
    //   ]
    // });
  };

  render() {
    return (
      <Container>
        <Query
          variables={{
            userId: this.props.user.userId,
            listId: this.props.match.params.listId
          }}
          query={getList}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
                <Row>
                  <div>
                    {data.list.type === 'Movie' && (
                      <FontAwesomeIcon icon={faFilm} />
                    )}
                    {data.list.type === 'Serie' && (
                      <FontAwesomeIcon icon={faTv} />
                    )}
                    {'   '}
                    {data.list.name}
                  </div>
                </Row>

                <Row>
                  {data.list.items.map(item => (
                    <Col xs="12" md="6" lg="4" key={item.id}>
                      <Row>
                        <ActionsPanel
                          onClickDeleteButton={() =>
                            this.handleDeleteItem(item.id)
                          }
                          onClickCompleteButton={() =>
                            this.handleCompleteMovie(item.id)
                          }
                          onClickRemoveFromList={() =>
                            this.handleRemoveItemFromList(item.id)
                          }
                        />
                      </Row>
                      <Row>{item.title} </Row>
                      <Row
                        onClick={event =>
                          this.goToItemDetail(item.id, data.list.type)
                        }
                      >
                        <img
                          src={item.images.medium.main}
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
