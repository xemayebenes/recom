import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import debounce from 'lodash.debounce';
import { Input, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import classnames from 'classnames';
import { compose, withApollo } from 'react-apollo';
import { withRouter } from 'react-router';

import { MOVIE, SERIE } from 'modules/constants';

import search from 'gql/search/search.gql';

import { SearchItem, SearchItemModal } from 'modules/search/components';

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

  toggleSerie = () => {
    this.toggle(SERIE);
  };
  toggleMovie = () => {
    this.toggle(MOVIE);
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

  handleSave = async id => {
    this.setState({
      showModal: false,
      item: null,
      searchItems: [],
      searchText: ''
    });
    if (this.state.itemType === MOVIE) {
      this.props.history.push(`/item-detail/movie/${id}`);
    }
    if (this.state.itemType === SERIE) {
      this.props.history.push(`/item-detail/serie/${id}`);
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
        <div
          className={classnames(
            styles.searchContainer,
            'mt-1',
            'order-3',
            'order-md-2'
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
            <div className={classnames(styles.container)}>
              {((searchFilms && searchFilms.length > 0) ||
                (searchSeries && searchSeries.length > 0)) && (
                <Fragment>
                  <div className="d-flex justify-content-around">
                    <div
                      className={classnames(
                        'p-2',
                        'flex-grow-1',
                        styles.tab,
                        styles['tab-right'],
                        {
                          [styles.active]: this.state.activeTab === MOVIE,
                          [styles.inactive]: this.state.activeTab !== MOVIE
                        }
                      )}
                    >
                      <div onClick={this.toggleMovie}>
                        Movies ({searchFilms.length})
                      </div>
                    </div>
                    <div
                      className={classnames('p-2', 'flex-grow-1', styles.tab, {
                        [styles.active]: this.state.activeTab === SERIE,
                        [styles.inactive]: this.state.activeTab !== SERIE
                      })}
                    >
                      <div onClick={this.toggleSerie}>
                        Series ({searchSeries.length})
                      </div>
                    </div>
                  </div>
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
            </div>
          )}
        </div>
        {showModal && (
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
  injectIntl,
  withApollo,
  withRouter
)(SearchBar);
