import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFilm from '@fortawesome/fontawesome-free-solid/faFilm';
import faTv from '@fortawesome/fontawesome-free-solid/faTv';

import styles from './LastItem.mod.css';

export class LastItem extends React.PureComponent {
  static displayName = 'LastItem';

  static propTypes = {
    type: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      overview: PropTypes.string,
      images: PropTypes.shape({
        large: PropTypes.shape({
          main: PropTypes.string.isRequired
        })
      })
    })
  };

  goToItemDetail = _ =>
    this.props.history.push(
      `/item-detail/${this.props.type.toLowerCase()}/${this.props.item.id}`
    );

  render() {
    const { type, item } = this.props;
    return (
      <div onClick={this.goToItemDetail} className={styles.lastItem}>
        <div className={styles.lastItemDecorator}>
          <div>
            {type === 'Movie' && <FontAwesomeIcon icon={faFilm} />}
            {type === 'Serie' && <FontAwesomeIcon icon={faTv} />}
          </div>
        </div>
        <div className={styles.posterWrap}>
          <img
            src={item.images.large.main}
            alt="main"
            className={styles.poster}
          />
          <span className="float-right mr-5">{item.title} </span>
        </div>
        {
          // <div
          //   className={classnames(
          //     styles.title,
          //     'd-flex',
          //     'justify-content-between',
          //     'align-items-center',
          //     'px-5',
          //   )}
          // >
          //   {type === 'Movie' && <FontAwesomeIcon icon={faFilm} />}
          //   {type === 'Serie' && <FontAwesomeIcon icon={faTv} />}
          //   <span>{item.title} </span>
          // </div>
        }
      </div>
    );
  }
}

export default withRouter(LastItem);
