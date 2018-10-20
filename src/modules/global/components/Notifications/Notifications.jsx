import React, { Fragment } from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import classnames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-free-regular/faBell';

import subNewNotification from 'gql/notifications/subNewNotification.gql';
import getNotifications from 'gql/notifications/getNotifications.gql';
import markNotification from 'gql/notifications/markNotification.gql';

import { ListNotificationsModal } from 'modules/notifications';

import styles from './Notifications.mod.css';

class Notifications extends React.PureComponent {
  static displayName = 'Notifications';

  state = {
    newNotifications: [],
    notifications: [],
    showModal: false
  };

  componentDidMount = async () => {
    const results = await this.props.client.query({
      query: getNotifications
    });
    this.setState({
      newNotifications: results.data.notifications.filter(
        notification => notification.new === true
      ),
      notifications: results.data.notifications
    });
  };
  componentWillReceiveProps(props) {
    if (props.data && props.data.newNotification) {
      this.setState(prevState => ({
        newNotifications: [
          props.data.newNotification,
          ...prevState.newNotifications
        ],
        notifications: [props.data.newNotification, ...prevState.notifications]
      }));
    }
  }

  openShareModal = _ => {
    this.setState({ showModal: true });
  };

  handleCloseModal = _ => {
    this.setState({ showModal: false });
  };

  handleDismissNotification = async id => {
    await this.props.client.mutate({
      mutation: markNotification,
      variables: {
        id
      }
    });

    this.setState(prevState => ({
      newNotifications: prevState.newNotifications.filter(
        notification => notification.id !== id
      ),
      notifications: prevState.notifications.map(notification => ({
        ...notification,
        new: notification.id === id ? false : notification.new
      }))
    }));
  };

  render() {
    const { newNotifications, notifications, showModal } = this.state;
    return (
      <Fragment>
        <div
          className={classnames(
            'ml-4',
            'mr-4',
            styles.notifications,
            'justify-content-end',
            'justify-content-md-start',
            'order-2',
            'order-md-3'
          )}
          onClick={this.openShareModal}
        >
          <FontAwesomeIcon icon={faBell} />
          {newNotifications.length}
        </div>
        {showModal && (
          <ListNotificationsModal
            notifications={notifications}
            handleCloseModal={this.handleCloseModal}
            onClickDismissNotification={this.handleDismissNotification}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  graphql(subNewNotification),
  withApollo
)(Notifications);
