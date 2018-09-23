import React from 'react';
import classnames from 'classnames';
import { Row, Col, Button } from 'reactstrap';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import styles from './ListItem.mod.css';

const ListItem = ({
  id,
  images,
  title,
  completed,
  onClickItem,
  onClickDeleteButton,
  onClickCompleteButton
}) => (
  <Col xs="12" md="6" lg="3">
    <div className="shadow p-2 d-flex flex-column">
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

        <Button outline size="sm" color="primary" onClick={onClickDeleteButton}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </div>
    </div>
  </Col>
);

ListItem.displayName = 'ListItem';

ListItem.propTypes = {};
export default ListItem;
