import React from 'react';
import classnames from 'classnames';
import { Row, Col, Button } from 'reactstrap';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faMinusSquare from '@fortawesome/fontawesome-free-regular/faMinusSquare';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './ListItem.mod.css';

const ListItem = ({
  id,
  images,
  title,
  completed,
  onClickItem,
  onClickDeleteButton,
  onClickCompleteButton,
  onClickRemoveFromList
}) => (
  <Col xs="12" md="6" lg="3">
    <div className="shadow p-2 d-flex flex-column h-100 justify-content-between">
      <div onClick={onClickItem}>
        <div className="text-center">{title} </div>
        <div className="text-center">
          <img
            src={images.medium.main}
            alt="main"
            className={classnames('p-2', styles.image)}
          />
        </div>
      </div>
      <div className="align-self-end">
        {onClickCompleteButton && (
          <Button
            disabled={completed}
            outline
            size="sm"
            color="secondary"
            onClick={onClickCompleteButton}
            className="mr-1"
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        )}

        {onClickDeleteButton && (
          <Button
            outline
            size="sm"
            color="primary"
            onClick={onClickDeleteButton}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        )}
        {onClickRemoveFromList && (
          <Button
            outline
            size="sm"
            color="warning"
            onClick={onClickRemoveFromList}
          >
            <FontAwesomeIcon icon={faMinusSquare} />
          </Button>
        )}
      </div>
    </div>
  </Col>
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {};
export default ListItem;
