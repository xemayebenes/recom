import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';

import { Query, compose, withApollo, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';

import { Button } from 'reactstrap';
import classnames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';

import { ListItem } from 'modules/items/components';
import { SendNotificationModal } from 'modules/notifications';
import { ContainerScrollHorizontal, Loader } from 'modules/global/components';

import getList from 'gql/lists/getList.gql';
import getLists from 'gql/lists/getLists.gql';
import REMOVE_LIST from 'gql/lists/removeList.gql';
import removeItemFromList from 'gql/lists/removeItemFromList.gql';

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
      <Fragment>
        <Query
          variables={{
            userId: this.props.user.userId,
            listId: this.props.match.params.listId
          }}
          query={getList}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader />;
            if (error) return <p>Error :(</p>;

            return (
              <Fragment>
                <div
                  className={classnames(
                    styles.header,
                    'd-flex flex-column justify-content-center align-items-center'
                  )}
                >
                  <div className="d-flex align-items-baseline">
                    <div className="mr-3 fa-xs">
                      <FontAwesomeIcon
                        icon={data.list.type === 'Movie' ? faFilm : faTv}
                      />
                    </div>
                    <div className="text-uppercase">{data.list.name}</div>
                  </div>
                </div>
                <div className="m-3">
                  <div className="d-flex justify-content-end mb-3">
                    <OpenShareModalButton
                      list={data.list}
                      onClick={this.openShareModal}
                    />
                    <DeleteListButton
                      id={data.list.id}
                      userId={this.props.user.userId}
                      history={this.props.history}
                    />
                  </div>
                  <div className="text-justify">{data.list.description}</div>
                </div>
                <div className={styles.container}>
                  <ContainerScrollHorizontal>
                    {data.list.items.map(item => (
                      <ListItem
                        key={item.id}
                        id={item.id}
                        type={data.list.type}
                        images={item.images}
                        title={item.title}
                        onClickItem={this.goToItemDetail}
                        onClickRemoveFromList={this.handleRemoveItemFromList}
                      />
                    ))}
                  </ContainerScrollHorizontal>
                </div>
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
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(Movies);

class OpenShareModalButton extends PureComponent {
  static displayName = 'OpenShareModalButton';

  handleClick = () => {
    this.props.onClick(this.props.list);
  };
  render() {
    return (
      <Button
        size="sm"
        color="primary"
        className="mr-1"
        onClick={this.handleClick}
      >
        <div className="d-flex align-items-baseline">
          <div className="mr-3 fa-xs">
            <FontAwesomeIcon icon={faShareAlt} />
          </div>
          <div className="text-uppercase"> Share</div>
        </div>
      </Button>
    );
  }
}
class DeleteListButton extends PureComponent {
  static displayName = 'DeleteListButton';

  handleOnComplete = () => {
    this.props.history.push('/lists');
  };
  render() {
    const { id, userId } = this.props;
    return (
      <Mutation mutation={REMOVE_LIST} onCompleted={this.handleOnComplete}>
        {(removelist, { loading, error }) => (
          <Button
            size="sm"
            color="primary"
            className="float-right"
            onClick={async () => {
              await removelist({
                variables: {
                  listId: id
                },
                update: (proxy, { data }) => {
                  const cache = proxy.readQuery({
                    query: getLists,
                    variables: {
                      userId: userId
                    }
                  });
                  proxy.writeQuery({
                    query: getLists,
                    variables: {
                      userId: userId
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
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div className="text-uppercase"> Remove</div>
            </div>
          </Button>
        )}
      </Mutation>
    );
  }
}
