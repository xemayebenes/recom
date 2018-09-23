import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import { Row, Col, Container, Button } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';

import { ListItem } from 'modules/items/components';
import { SendNotificationModal } from 'modules/notifications';
import { ContainerTemplate } from 'modules/global/components';

import getList from 'gql/lists/getList.gql';
import getLists from 'gql/lists/getLists.gql';
import REMOVE_LIST from 'gql/lists/removeList.gql';
import removeItemFromList from 'gql/lists/removeItemFromList.gql';
// import completeMovie from 'gql/movies/completeMovie.gql';
//
// import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';

import styles from './UserList.mod.css';
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
      <div className={styles.container}>
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
              <ContainerTemplate title={<div>{data.list.name}</div>}>
                <Row className="my-2">
                  <Col xs="12" md="10">
                    {data.list.description && (
                      <div>{data.list.description}</div>
                    )}
                  </Col>
                  <Col xs="12" md="1">
                    <Button
                      color="primary"
                      onClick={() => this.openShareModal(data.list)}
                    >
                      Share
                    </Button>
                  </Col>
                  <Col xs="12" md="1">
                    <Mutation
                      mutation={REMOVE_LIST}
                      onCompleted={() => this.props.history.push('/lists')}
                    >
                      {(removelist, { loading, error }) => (
                        <Button
                          color="primary"
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
                  </Col>
                </Row>

                <div className="flex-wrap flex-row justify-content-start d-flex">
                  {data.list.items.map(item => (
                    <ListItem
                      key={item.id}
                      images={item.images}
                      title={item.title}
                      onClickItem={() =>
                        this.goToItemDetail(item.id, data.list.type)
                      }
                      onClickRemoveFromList={() =>
                        this.handleRemoveItemFromList(item.id)
                      }
                    />
                  ))}
                </div>
              </ContainerTemplate>
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
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(Movies);
