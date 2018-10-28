import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import { compose, withApollo } from 'react-apollo';

import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { getUserId } from 'utils/security';

import { MOVIE, SERIE } from 'modules/constants';
import { MovieData, SerieData } from 'modules/items/components';
import { ListSelect } from 'modules/global/components';
import addMovie from 'gql/movies/addMovie.gql';
import addSerie from 'gql/series/addSerie.gql';
import getUserLastItems from 'gql/lastItems/getUserLastItems.gql';
import addItemToList from 'gql/lists/addItemToList.gql';
import getUserMovies from 'gql/movies/getUserMovies.gql';
import getUserSeries from 'gql/series/getUserSeries.gql';

export class SearchItemModal extends PureComponent {
  static displayName = 'SearchItemModal';

  state = {
    listSelected: null
  };

  handleSelectList = list => {
    this.setState({ listSelected: list });
  };

  addToList = async itemId => {
    await this.props.client.mutate({
      mutation: addItemToList,
      variables: { listId: this.state.listSelected, itemId }
    });
  };

  handleSave = async _ => {
    if (this.props.itemType === MOVIE) {
      const result = await this.props.client.mutate({
        mutation: addMovie,
        variables: { externalId: this.props.item.externalId },
        refetchQueries: [
          {
            query: getUserLastItems,
            variables: { userId: getUserId() }
          },
          {
            query: getUserMovies,
            variables: { userId: getUserId() }
          }
        ]
      });
      this.state.listSelected &&
        (await this.addToList(result.data.addMovie.id));

      this.setState({ listSelected: null });
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
          },
          {
            query: getUserSeries,
            variables: { userId: getUserId() }
          }
        ]
      });
      this.state.listSelected &&
        (await this.addToList(result.data.addSerie.id));
      this.setState({ listSelected: null });
      this.props.onClickSaveButton(result.data.addSerie.id);
    }
  };

  handleCancel = () => {
    this.setState({ listSelected: null });
    this.props.onClickCancelButton();
  };

  render() {
    const { item, itemType } = this.props;
    return (
      <Modal isOpen={true}>
        <ModalBody>
          {itemType === MOVIE && <MovieData {...item} search={true} />}
          {itemType === SERIE && <SerieData {...item} search={true} />}
        </ModalBody>
        <ModalFooter>
          <ListSelect
            userId={getUserId()}
            onSelectItem={event => this.handleSelectList(event.target.value)}
            type={itemType}
          />
          <Button color="primary" onClick={this.handleSave}>
            Guardar
          </Button>
          <Button color="secondary" onClick={this.handleCancel}>
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
