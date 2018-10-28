import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { compose, withHandlers } from 'recompose';

import { Button, ListGroupItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

import styles from './NotificationItem.mod.css';

export class NotificationItem extends PureComponent {
  static displayName = 'NotificationItem';

  static propTypes = {
    id: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    type: PropTypes.string.isRequired,
    listId: PropTypes.string,
    title: PropTypes.string.isRequired,
    externalId: PropTypes.number,
    from: PropTypes.object.isRequired,
    date: PropTypes.number.isRequired,
    onClickDismissNotification: PropTypes.func.isRequired,
    onClickItem: PropTypes.func.isRequired
  };
  render() {
    const {
      id,
      isNew,
      type,
      title,
      from,
      date,
      handleClickDismissButton,
      handleSelectItem,
      intl
    } = this.props;
    return (
      <ListGroupItem
        key={id}
        action
        className={isNew ? null : styles.notNew}
        onClick={handleSelectItem}
      >
        <Fragment>
          <div className="d-flex justify-content-between align-items-end">
            <div className={styles.type}>{type}</div>
            <div className={styles.date}>{intl.formatDate(date)}</div>
          </div>
          <div className={styles.title}>{title}</div>
          <div className="text-right">Sended by {from.email}</div>
          {isNew && (
            <Button
              size="sm"
              color="primary"
              onClick={handleClickDismissButton}
            >
              <div className="d-flex align-items-baseline">
                <div className="mr-3 fa-xs">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="text-uppercase"> Dismiss</div>
              </div>
            </Button>
          )}
        </Fragment>
      </ListGroupItem>
    );
  }
}

export default compose(
  injectIntl,
  withHandlers({
    handleClickDismissButton: props => event => {
      event.stopPropagation();
      props.onClickDismissNotification(props.id);
    },
    handleSelectItem: props => event => {
      event.stopPropagation();
      if (props.isNew) {
        props.onClickItem(props.externalId, props.type, props.id, props.listId);
      }
    }
  })
)(NotificationItem);
