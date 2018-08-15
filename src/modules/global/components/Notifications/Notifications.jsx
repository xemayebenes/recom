import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import classnames from 'classnames';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBell from '@fortawesome/fontawesome-free-regular/faBell';

import subNewNotification from 'gql/subNewNotification.gql';
import getNotifications from 'gql/getNotifications.gql';

import styles from './Notifications.mod.css';

class Notifications extends React.PureComponent {
  static displayName = 'Notifications';

  state = {
    newNotifications: [],
    readNotifications: []
  };

  componentDidMount = async () => {
    const results = await this.props.client.query({
      query: getNotifications
    });
    this.setState({
      newNotifications: results.data.notifications.filter(
        notification => notification.new === true
      ),
      readNotifications: results.data.notifications.filter(
        notification => notification.new === false
      )
    });
  };
  componentWillReceiveProps(props) {
    if (props.data && props.data.newNotification) {
      this.setState(prevState => ({
        newNotifications: [
          props.data.newNotification,
          ...prevState.newNotifications
        ]
      }));
    }
  }
  render() {
    const { props, state } = this;
    return (
      <div className={classnames('mr-5', styles.notifications)}>
        <FontAwesomeIcon icon={faBell} />
        {state.newNotifications.length}
      </div>
    );
  }
}

export default compose(
  graphql(subNewNotification),
  withApollo
)(Notifications);
