import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { FormattedDate } from 'react-intl';
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
        medium: PropTypes.shape({
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
    const { type, item, date } = this.props;
    return (
      <Fragment>
        <div
          onClick={this.goToItemDetail}
          className={classnames(styles.card, 'd-none', 'd-md-flex')}
        >
          <img
            src={item.images.medium.main}
            alt="main"
            className={styles.image}
          />
          <div className={styles.cardBottom}>
            <div className="ml-2">{item.title}</div>
            <div className="d-flex justify-content-end">
              <div className="mr-2">
                {type === 'Movie' && <FontAwesomeIcon icon={faFilm} />}
                {type === 'Serie' && <FontAwesomeIcon icon={faTv} />}
              </div>
              <div className="mr-2">
                <FormattedDate value={new Date(date)} />
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={this.goToItemDetail}
          className={classnames(
            'd-flex',
            'd-md-none',
            'align-items-center',
            'justify-content-start',
            styles.miniCard
          )}
        >
          <div>
            <img src={item.images.small.main} alt={item.title} />
          </div>
          <div className="d-flex align-items-baseline fa-2x ml-2">
            <div>{item.title}</div>
          </div>
          <div className="d-flex flex-column align-self-end align-items-end flex-grow-1 mr-2">
            <div>
              {type === 'Movie' && <FontAwesomeIcon icon={faFilm} />}
              {type === 'Serie' && <FontAwesomeIcon icon={faTv} />}
            </div>
            <div>
              <FormattedDate value={new Date(date)} />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(LastItem);
