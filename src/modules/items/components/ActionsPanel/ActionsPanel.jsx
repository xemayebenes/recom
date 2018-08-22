import React from 'react';
import { Row, Col, Button } from 'reactstrap';

import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const ActionsPanel = ({
  onClickDeleteButton,
  onClickCompleteButton,
  onClickShare,
  completed
}) => (
  <Row className="pt-2 pb-4">
    <Col xs="4">
      <Button outline size="sm" color="primary" onClick={onClickDeleteButton}>
        <FontAwesomeIcon icon={faTrashAlt} /> <span>Delete</span>
      </Button>
    </Col>
    <Col xs="4">
      <Button
        disabled={completed}
        outline
        size="sm"
        color="secondary"
        onClick={onClickCompleteButton}
      >
        <FontAwesomeIcon icon={faCheckCircle} /> <span>Mark as view</span>
      </Button>
    </Col>
    <Col xs="4">
      {onClickShare && (
        <Button outline size="sm" color="secondary" onClick={onClickShare}>
          <FontAwesomeIcon icon={faCheckCircle} /> <span>Share</span>
        </Button>
      )}
    </Col>
  </Row>
);

ActionsPanel.displayName = 'ActionsPanel';

ActionsPanel.propTypes = {};
export default ActionsPanel;
