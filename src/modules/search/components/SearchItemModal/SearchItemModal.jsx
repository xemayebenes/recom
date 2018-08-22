import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { getUserId } from 'utils/security';

import { MOVIE, SERIE } from 'modules/constants';
import { MovieData, SerieData } from 'modules/items/components';
import addMovie from 'gql/addMovie.gql';
import addSerie from 'gql/addSerie.gql';
import getUserLastItems from 'gql/getUserLastItems.gql';

export class SearchItemModal extends PureComponent {
  static displayName = 'SearchItemModal';

  handleSave = async _ => {
    if (this.props.itemType === MOVIE) {
      const result = await this.props.client.mutate({
        mutation: addMovie,
        variables: { externalId: this.props.item.externalId },
        refetchQueries: [
          {
            query: getUserLastItems,
            variables: { userId: getUserId() }
          }
        ]
      });
      this.props.onClickSaveButton(result.data.addMovie.id);
    }
    if (this.props.itemType === SERIE) {
      const result = await this.props.client.mutate({
        mutation: addSerie,
        variables: { externalId: this.props.item.externalId },
        refetchQueries: [
          {
            query: getUserLastItems,
            variables: { userId: getUserId() }
          }
        ]
      });
      this.props.onClickSaveButton(result.data.addSerie.id);
    }
  };
  render() {
    const { item, itemType, onClickCancelButton } = this.props;
    return (
      <Modal isOpen={true}>
        <ModalBody>
          {itemType === MOVIE && <MovieData {...item} />}
          {itemType === SERIE && <SerieData {...item} />}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSave}>
            Guardar
          </Button>
          <Button color="secondary" onClick={onClickCancelButton}>
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
)(SearchItemModal);
