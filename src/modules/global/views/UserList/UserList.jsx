import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container, Button } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';

import { ActionsPanel } from 'modules/items/components';
import { SendNotificationModal } from 'modules/notifications';

import getList from 'gql/getList.gql';
import getLists from 'gql/getLists.gql';
import REMOVE_LIST from 'gql/removeList.gql';
import removeItemFromList from 'gql/removeItemFromList.gql';
// import completeMovie from 'gql/completeMovie.gql';
//
// import getUserLastItems from 'gql/getUserLastItems.gql';

export class Movies extends PureComponent {
  static displayName = 'Movies';

  state = {
    showModal: false,
    listId: undefined,
    title: undefined
  };

  goToItemDetail = (id, type) => {
    const route = `/item-detail/${type.toLowerCase()}/${id}`;
    this.props.history.push(route);
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
    });
  };

  handleCloseModal = _ => {
    this.setState({
      showModal: false,
      listId: undefined,
      title: undefined
    });
  };
  openShareModal = ({ id, name }) => {
    this.setState({ showModal: true, title: name, listId: id });
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
                    {'   '}
                    {data.list.description && (
                      <div>{data.list.description}</div>
                    )}
                  </div>
                  <Button
                    outline
                    size="sm"
                    color="secondary"
                    onClick={() => this.openShareModal(data.list)}
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </Button>
                  <Mutation
                    mutation={REMOVE_LIST}
                    onCompleted={() => this.props.history.push('/lists')}
                  >
                    {(removelist, { loading, error }) => (
                      <Button
                        color="secondary"
                        onClick={async () => {
                          await removelist({
                            variables: {
                              listId: data.list.id
                            },
                            update: (proxy, { data }) => {
                              const cache = proxy.readQuery({
                                query: getLists,
                                variables: {
                                  userId: this.props.user.userId
                                }
                              });
                              proxy.writeQuery({
                                query: getLists,
                                variables: {
                                  userId: this.props.user.userId
                                },
                                data: {
                                  lists: cache.lists.filter(
                                    list => list.id !== data.removeList
                                  )
                                }
                              });
                            }
                          });
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </Mutation>
                </Row>
                <Row>
                  {data.list.items.map(item => (
                    <Col xs="12" md="6" lg="4" key={item.id}>
                      <Row>
                        <ActionsPanel
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
        {this.state.showModal && (
          <SendNotificationModal
            externalId={null}
            type={'List'}
            title={this.state.title}
            listId={this.state.listId}
            handleCloseModal={this.handleCloseModal}
          />
        )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(Movies);
