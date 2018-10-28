import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import { withApollo, compose } from 'react-apollo';

import { SearchItemModal } from 'modules/search/components';
import { MOVIE, SERIE } from 'modules/constants';

import getMovie from 'gql/movies/getMovie.gql';
import getSerie from 'gql/series/getSerie.gql';

export class ItemImport extends PureComponent {
  static displayName = 'ItemImport';

  static propTypes = {};

  state = {
    item: undefined
  };

  goToHome = () => {
    this.props.history.push(`/`);
  };

  goToItem = id => {
    this.props.history.push(
      `/item-detail/${this.state.itemType.toLowerCase()}/${id}`
    );
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { externalId, type }
      }
    } = this.props;
    let data;
    let itemType;
    if (type === MOVIE.toLowerCase()) {
      const result = await this.props.client.query({
        query: getMovie,
        variables: {
          externalId
        }
      });

      data = result.data.getMovie;
      itemType = MOVIE;
    }

    if (type === SERIE.toLowerCase()) {
      const result = await this.props.client.query({
        query: getSerie,
        variables: {
          externalId
        }
      });
      data = result.data.getSerie;
      itemType = SERIE;
    }
    this.setState({ item: data, itemType });
  };

  render() {
    return this.state.item ? (
      <SearchItemModal
        item={this.state.item}
        itemType={this.state.itemType}
        onClickSaveButton={this.goToItem}
        onClickCancelButton={this.goToHome}
      />
    ) : null;
  }
}

export default compose(
  withRouter,
  withApollo,
  injectIntl
)(ItemImport);
