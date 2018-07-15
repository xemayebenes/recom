import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import debounce from 'lodash.debounce';
import {
  Button,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import classnames from 'classnames';
import { compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { MOVIE, SERIE } from 'modules/constants';

import search from 'gql/search.gql';
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
      activeTab: MOVIE,
      showModal: false
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  search = async text => {
    const result = await this.props.client.query({
      query: search,
      variables: { searchText: text }
    });

    this.setState({ searchItems: result.data });
  };

  searchDebounced = debounce(this.search, 300);

  handleSearch = event => {
    this.setState({ searchText: event.target.value });
    this.searchDebounced(event.target.value);
  };

  handleItemSelector = value => {
    this.setState({ itemType: value, searchItems: [], searchText: '' });
  };

  handleSelectItem = (data, itemType) => {
    this.setState({ showModal: true, item: data, itemType });
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
    const {
      searchText,
      searchItems: { searchFilms, searchSeries },
      itemType,
      showModal,
      item
    } = this.state;
    return (
      <Fragment>
        <Container
          className={classnames(
            'w-50',
            'position-absolute',
            styles.searchContainer
          )}
        >
          <div className="d-flex">
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
              {((searchFilms && searchFilms.length > 0) ||
                (searchSeries && searchSeries.length > 0)) && (
                <Fragment>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === MOVIE
                        })}
                        onClick={() => {
                          this.toggle(MOVIE);
                        }}
                      >
                        Movies ({searchFilms.length})
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === SERIE
                        })}
                        onClick={() => {
                          this.toggle(SERIE);
                        }}
                      >
                        Series ({searchSeries.length})
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={MOVIE}>
                      {searchFilms.map(item => (
                        <SearchItem
                          key={item.externalId}
                          item={item}
                          type={MOVIE}
                          onSelectItem={this.handleSelectItem}
                        />
                      ))}
                    </TabPane>
                    <TabPane tabId={SERIE}>
                      {searchSeries.map(item => (
                        <SearchItem
                          key={item.externalId}
                          item={item}
                          type={SERIE}
                          onSelectItem={this.handleSelectItem}
                        />
                      ))}
                    </TabPane>
                  </TabContent>
                </Fragment>
              )}
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
