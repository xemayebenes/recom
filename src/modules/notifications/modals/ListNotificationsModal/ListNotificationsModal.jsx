import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import { MOVIE, SERIE, LIST } from 'modules/constants';

import { SearchItemModal } from 'modules/search/components';
import getMovie from 'gql/movies/getMovie.gql';
import getSerie from 'gql/series/getSerie.gql';

import styles from './ListNotificationsModal.mod.css';

export class ListNotificationsModal extends PureComponent {
  static displayName = 'ListNotificationsModal';

  state = {
    showSearchItemModal: false,
    item: undefined,
    itemType: undefined
  };

  handleSelectItem = async (externalId, itemType, notificationId, listId) => {
    let data;
    if (itemType === LIST) {
      // this.setState({
      //   showSearchItemModal: false,
      //   item: undefined,
      //   itemType: undefined,
      //   notificationId: undefined
      // });
      await this.props.onClickDismissNotification(notificationId);
      // this.props.handleCloseModal();
      this.props.history.push(`/lists/import/${listId}`);
    } else {
      if (itemType === MOVIE) {
        const result = await this.props.client.query({
          query: getMovie,
          variables: {
            externalId
          }
        });

        data = result.data.getMovie;
      }

      if (itemType === SERIE) {
        const result = await this.props.client.query({
          query: getSerie,
          variables: {
            externalId
          }
        });
        data = result.data.getSerie;
      }

      this.setState({
        showSearchItemModal: true,
        item: data,
        itemType,
        notificationId
      });
    }
  };

  handleSave = async () => {
    this.props.onClickDismissNotification(this.state.notificationId);
    this.setState({
      showSearchItemModal: false,
      item: undefined,
      itemType: undefined,
      notificationId: undefined
    });
    this.props.handleCloseModal();
  };

  handleCloseModal = _ => {
    this.setState({
      showSearchItemModal: false,
      item: undefined,
      itemType: undefined,
      notificationId: undefined
    });
  };

  render() {
    const {
      notifications,
      handleCloseModal,
      onClickDismissNotification,
      intl
    } = this.props;

    const { showSearchItemModal, item, itemType } = this.state;
    return (
      <Fragment>
        <Modal isOpen={true} toggle={this.toggle}>
          <ModalBody>
            <ListGroup className={styles.list}>
              {notifications.map(notification => (
                <ListGroupItem
                  key={notification.id}
                  action
                  className={notification.new ? null : styles.notNew}
                  onClick={() =>
                    notification.new
                      ? this.handleSelectItem(
                          notification.externalId,
                          notification.type,
                          notification.id,
                          notification.listId
                        )
                      : null
                  }
                >
                  <ListGroupItemHeading>
                    {notification.type}
                  </ListGroupItemHeading>
                  <ListGroupItemText>{notification.title}</ListGroupItemText>
                  <ListGroupItemText>
                    {notification.externalId}
                  </ListGroupItemText>
                  <ListGroupItemText>
                    From: {notification.from.email}
                  </ListGroupItemText>
                  <ListGroupItemText>
                    {intl.formatDate(notification.date)}
                  </ListGroupItemText>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={event => {
                      event.stopPropagation();
                      onClickDismissNotification(notification.id);
                    }}
                  >
                    Dismiss
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {showSearchItemModal && (
          <SearchItemModal
            item={item}
            itemType={itemType}
            onClickSaveButton={this.handleSave}
            onClickCancelButton={this.handleCloseModal}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withApollo,
  withRouter,
  injectIntl
)(ListNotificationsModal);
