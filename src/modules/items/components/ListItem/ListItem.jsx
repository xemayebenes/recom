import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { compose, withHandlers } from 'recompose';
import classnames from 'classnames';
import { imageShape } from 'modules/global/proptypes';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faMinus from '@fortawesome/fontawesome-free-solid/faMinus';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './ListItem.mod.css';

const ListItem = ({
  id,
  images,
  title,
  completed,
  handleOnClickItem,
  onClickDeleteButton,
  handleDeleteItem,
  onClickCompleteButton,
  handleCompleteButton,
  onClickRemoveFromList,
  handleRemoveFromList
}) => (
  <Fragment>
    <div
      onClick={handleOnClickItem}
      className={classnames(
        'd-flex',
        'd-md-none',
        'align-items-center',
        'justify-content-start',
        styles.miniCard
      )}
    >
      <div>
        <img src={images.small.main} alt={title} />
      </div>
      <div className="d-flex align-items-baseline fa-2x ml-2">
        <div>{title}</div>
      </div>
      <div className="d-flex align-self-end align-items-end flex-grow-1 mr-2 mb-2 justify-content-end">
        {onClickCompleteButton && (
          <Button
            disabled={completed}
            size="sm"
            color="primary"
            onClick={handleCompleteButton}
            className="mr-1"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        )}

        {onClickDeleteButton && (
          <Button size="sm" onClick={handleDeleteItem} color="secondary">
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        )}
        {onClickRemoveFromList && (
          <Button size="sm" color="primary" onClick={handleRemoveFromList}>
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        )}
      </div>
    </div>
    <div
      onClick={handleOnClickItem}
      className={classnames(styles.card, 'd-none', 'd-md-flex')}
    >
      <img src={images.medium.main} alt="main" className={styles.image} />
      <div
        className={classnames(
          styles.cardBottom,
          'align-items-baseline',
          'shadow'
        )}
      >
        <div className="ml-2">{title}</div>
        <div className="d-flex justify-content-end m-2">
          <div className="align-self-end">
            {onClickCompleteButton && (
              <Button
                disabled={completed}
                size="sm"
                color="primary"
                onClick={handleCompleteButton}
                className="mr-1"
              >
                <FontAwesomeIcon icon={faCheckCircle} />
              </Button>
            )}

            {onClickDeleteButton && (
              <Button size="sm" onClick={handleDeleteItem} color="secondary">
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            )}
            {onClickRemoveFromList && (
              <Button size="sm" color="primary" onClick={handleRemoveFromList}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  images: imageShape.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onClickItem: PropTypes.func,
  onClickDeleteButton: PropTypes.func,
  onClickCompleteButton: PropTypes.func,
  onClickRemoveFromList: PropTypes.func
};

export default compose(
  withHandlers({
    handleOnClickItem: props => event => {
      event.stopPropagation();
      props.onClickItem(props.id, props.type);
    },
    handleCompleteButton: props => event => {
      event.stopPropagation();
      props.onClickCompleteButton(props.id);
    },
    handleDeleteItem: props => event => {
      event.stopPropagation();
      props.onClickDeleteButton(props.id);
    },
    handleRemoveFromList: props => event => {
      event.stopPropagation();
      props.onClickRemoveFromList(props.id);
    }
  })
)(ListItem);
