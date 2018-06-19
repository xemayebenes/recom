import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './LastItem.mod.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

const LastItem = ({ id, type, date, item }) => (
  <div>
    <img src={item.images.main} alt="main" className={styles.poster} />
    <div
      className={classnames(
        styles.title,
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'px-5'
      )}
    >
      {type === 'Movie' && <FontAwesomeIcon icon={faFilm} />}
      {type === 'Serie' && <FontAwesomeIcon icon={faTv} />}
      <span>{item.title} </span>
    </div>
  </div>
);

LastItem.displayName = 'LastItem';

LastItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    images: PropTypes.shape({
      main: PropTypes.string.isRequired
    })
  })
};
export default LastItem;
