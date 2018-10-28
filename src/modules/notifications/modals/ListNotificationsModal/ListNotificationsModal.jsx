import React, { PureComponent, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { Button, Modal, ModalBody, ModalFooter, ListGroup } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';

import { MOVIE, SERIE, LIST } from 'modules/constants';

import { SearchItemModal } from 'modules/search/components';
import { NotificationItem } from 'modules/notifications';
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
      onClickDismissNotification
    } = this.props;

    const { showSearchItemModal, item, itemType } = this.state;
    return (
      <Fragment>
        <Modal isOpen={true} toggle={this.toggle}>
          <ModalBody>
            <ListGroup className={styles.list}>
              {notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  isNew={notification.new}
                  title={notification.title}
                  type={notification.type}
                  externalId={notification.externalId}
                  from={notification.from}
                  date={notification.date}
                  onClickDismissNotification={onClickDismissNotification}
                  onClickItem={this.handleSelectItem}
                />
              ))}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              <div className="d-flex align-items-baseline">
                <div className="mr-3 fa-xs">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <div className="text-uppercase"> Close</div>
              </div>
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
