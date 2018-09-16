import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faMinusSquare from '@fortawesome/fontawesome-free-regular/faMinusSquare';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ActionsPanel = ({
  onClickDeleteButton,
  onClickCompleteButton,
  onClickShare,
  onClickRemoveFromList,
  completed
}) => (
  <Row className="pt-2 pb-4">
    {onClickDeleteButton && (
      <Col xs="4">
        <Button outline size="sm" color="primary" onClick={onClickDeleteButton}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </Col>
    )}
    {onClickCompleteButton && (
      <Col xs="4">
        <Button
          disabled={completed}
          outline
          size="sm"
          color="secondary"
          onClick={onClickCompleteButton}
        >
          <FontAwesomeIcon icon={faCheckCircle} />
        </Button>
      </Col>
    )}
    {onClickShare && (
      <Col xs="4">
        <Button outline size="sm" color="secondary" onClick={onClickShare}>
          <FontAwesomeIcon icon={faShareAlt} />
        </Button>
      </Col>
    )}
    {onClickRemoveFromList && (
      <Col xs="4">
        <Button
          outline
          size="sm"
          color="warning"
          onClick={onClickRemoveFromList}
        >
          <FontAwesomeIcon icon={faMinusSquare} />
        </Button>
      </Col>
    )}
  </Row>
);

ActionsPanel.displayName = 'ActionsPanel';

ActionsPanel.propTypes = {};
export default ActionsPanel;
