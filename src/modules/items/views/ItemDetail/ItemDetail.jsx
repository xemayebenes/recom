import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query, compose } from 'react-apollo';
import { Container } from 'reactstrap';
import { withRouter } from 'react-router';

import { MovieDetail, SerieDetail } from 'modules/items/components';
import styles from './ItemDetail.mod.css';
export class ItemDetail extends PureComponent {
  static displayName = 'ItemDetail';

  static propTypes = {
    //withRouter
    match: PropTypes.shape({
      params: PropTypes.shape({
        itemId: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };
  render() {
    const {
      match: {
        params: { itemId, type }
      },
      user
    } = this.props;

    return (
      <div className={styles.container}>
        {type === 'movie' ? (
          <MovieDetail id={itemId} userId={user.userId} />
        ) : (
          <SerieDetail id={itemId} userId={user.userId} />
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  injectIntl
)(ItemDetail);
