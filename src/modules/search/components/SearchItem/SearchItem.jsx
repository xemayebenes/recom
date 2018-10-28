import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { compose, withHandlers } from 'recompose';
import classnames from 'classnames';

import { imageShape } from 'modules/global/proptypes';
import { MOVIE, SERIE } from 'modules/constants';
import styles from './SearchItem.mod.css';

const SearchItem = ({ item, type, handleSelectItem, intl }) => (
  <div
    className={classnames('d-flex', 'align-items-center', styles.container)}
    onClick={handleSelectItem}
  >
    <div className={classnames(styles.image, 'ml-2')}>
      <img src={item.images.small.main} alt={item.title} />
    </div>
    <div className="d-flex ml-5 align-items-baseline">
      <div className={classnames(styles.title, 'ml-2')}>{item.title}</div>
      {type === MOVIE &&
        item.release_date && (
          <div className={classnames(styles.date, 'ml-2')}>
            ({intl.formatDate(item.release_date, { year: 'numeric' })})
          </div>
        )}
      {type === SERIE &&
        item.first_air_date && (
          <div className={classnames(styles.date, 'ml-2')}>
            ({intl.formatDate(item.first_air_date, { year: 'numeric' })})
          </div>
        )}
    </div>
  </div>
);

SearchItem.displayName = 'SearchItem';

SearchItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    images: imageShape,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string
  }),
  type: PropTypes.string.isRequired,
  onSelectItem: PropTypes.func.isRequired
};
export default compose(
  withHandlers({
    handleSelectItem: props => event => {
      event.stopPropagation();
      props.onSelectItem(props.item, props.type);
    }
  }),
  injectIntl
)(SearchItem);
