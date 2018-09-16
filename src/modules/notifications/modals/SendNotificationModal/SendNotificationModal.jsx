import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';

import { Button, Input, Modal, ModalBody, ModalFooter } from 'reactstrap';

import sendNotification from 'gql/sendNotification.gql';

export class SendNotificationModal extends PureComponent {
  static displayName = 'SendNotificationModal';

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
    const { externalId, handleCloseModal } = this.props;
    return (
      <Modal isOpen={true} toggle={this.toggle}>
        <ModalBody>
          <label>
            Send {externalId} to friend
            <Input
              type="email"
              value={this.state.userEmail}
              onChange={this.handleChange}
            />
          </label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSend}>
            Send
          </Button>
          <Button color="secondary" onClick={handleCloseModal}>
            Cancel
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
