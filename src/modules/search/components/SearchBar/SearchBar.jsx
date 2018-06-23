import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import debounce from 'lodash.debounce';
import {
  ButtonGroup,
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import classnames from 'classnames';
import { compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import { MOVIE, SERIE } from 'modules/constants';

import searchFilms from 'gql/searchFilms.gql';
import searchSeries from 'gql/searchSeries.gql';
import addMovie from 'gql/addMovie.gql';
import addSerie from 'gql/addSerie.gql';
import getUserLastItems from 'gql/getUserLastItems.gql';

import { SearchItem } from 'modules/search/components';
import { MovieData, SerieData } from 'modules/items/components';

import styles from './SearchBar.mod.css';

export class SearchBar extends PureComponent {
  static displayName = 'SearchBar';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchItems: [],
      itemType: MOVIE,
      showModal: false
    };
  }

  search = async text => {
    if (this.state.itemType === MOVIE) {
      const result = await this.props.client.query({
        query: searchFilms,
        variables: { searchText: text }
      });

      this.setState({ searchItems: result.data.searchFilms });
    }
    if (this.state.itemType === SERIE) {
      const result = await this.props.client.query({
        query: searchSeries,
        variables: { searchText: text }
      });

      this.setState({ searchItems: result.data.searchSeries });
    }
  };

  searchDebounced = debounce(this.search, 300);

  handleSearch = event => {
    this.setState({ searchText: event.target.value });
    this.searchDebounced(event.target.value);
  };

  handleItemSelector = value => {
    this.setState({ itemType: value, searchItems: [], searchText: '' });
  };

  handleSelectItem = data => {
    this.setState({ showModal: true, item: data });
  };

  handleCloseModal = _ => {
    this.setState({ showModal: false, item: null });
  };

  handleSave = async _ => {
    console.log(this.state.item);
    if (this.state.itemType === MOVIE) {
      const result = await this.props.client.mutate({
        mutation: addMovie,
        variables: { externalId: this.state.item.externalId },
        refetchQueries: [
          {
            query: getUserLastItems,
            variables: { userId: this.props.userId }
          }
        ]
      });
      this.setState({
        showModal: false,
        item: null,
        searchItems: [],
        searchText: ''
      });
      this.props.history.push(`/item-detail/movie/${result.data.addMovie.id}`);
    }
    if (this.state.itemType === SERIE) {
      const result = await this.props.client.mutate({
        mutation: addSerie,
        variables: { externalId: this.state.item.externalId },
        refetchQueries: [
          {
            query: getUserLastItems,
            variables: { userId: this.props.userId }
          }
        ]
      });
      this.setState({
        showModal: false,
        item: null,
        searchItems: [],
        searchText: ''
      });
      this.props.history.push(`/item-detail/serie/${result.data.addSerie.id}`);
    }
  };

  render() {
    const { searchText, searchItems, itemType, showModal, item } = this.state;
    return (
      <Fragment>
        <Container className={classnames('w-50', 'position-absolute')}>
          <div className="d-flex">
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.handleItemSelector(MOVIE)}
                active={itemType === MOVIE}
              >
                <FontAwesomeIcon icon={faFilm} />
              </Button>
              <Button
                size="sm"
                color="primary"
                onClick={() => this.handleItemSelector(SERIE)}
                active={itemType === SERIE}
              >
                <FontAwesomeIcon icon={faTv} />
              </Button>
            </ButtonGroup>
            <Input
              type="text"
              name="searchText"
              autoComplete="off"
              id="searchText"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
          </div>
          {searchText && (
            <Container className={classnames(styles.container)}>
              {searchItems.length > 0 && (
                <Fragment>
                  {searchItems.map(item => (
                    <SearchItem
                      key={item.externalId}
                      item={item}
                      type={itemType}
                      onSelectItem={this.handleSelectItem}
                    />
                  ))}
                </Fragment>
              )}
              {searchItems.length === 0 && <div>Sin resultados</div>}
            </Container>
          )}
        </Container>
        {showModal && (
          <Modal isOpen={showModal} toggle={this.toggle}>
            <ModalBody>
              {itemType === MOVIE && <MovieData {...item} />}
              {itemType === SERIE && <SerieData {...item} />}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSave}>
                Guardar
              </Button>
              <Button color="secondary" onClick={this.handleCloseModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  withApollo,
  withRouter
)(SearchBar);
