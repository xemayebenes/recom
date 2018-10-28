import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';

import { Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import faShare from '@fortawesome/fontawesome-free-solid/faShare';

import sendNotification from 'gql/notifications/sendNotification.gql';

export class SendNotificationModal extends PureComponent {
  static displayName = 'SendNotificationModal';

  static propTypes = {
    externalId: PropTypes.number,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    listId: PropTypes.string,
    handleCloseModal: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { userEmail: '' };
  }

  handleChange = event => {
    this.setState({ userEmail: event.target.value });
  };

  handleSend = async _ => {
    await this.props.client.mutate({
      mutation: sendNotification,
      variables: {
        externalId: this.props.externalId,
        type: this.props.type,
        title: this.props.title,
        listId: this.props.listId,
        userEmail: this.state.userEmail
      }
    });
    this.props.handleCloseModal();
  };

  render() {
    const { handleCloseModal, title } = this.props;
    return (
      <Modal isOpen={true} toggle={this.toggle}>
        <ModalBody>
          <label>Recommend {title} to friend</label>
          <Input
            type="email"
            value={this.state.userEmail}
            onChange={this.handleChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSend}>
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faShare} />
              </div>
              <div className="text-uppercase"> Send</div>
            </div>
          </Button>
          <Button color="secondary" onClick={handleCloseModal}>
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faTimesCircle} />
              </div>
              <div className="text-uppercase"> Cancel</div>
            </div>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default compose(
  withApollo,
  injectIntl
)(SendNotificationModal);
