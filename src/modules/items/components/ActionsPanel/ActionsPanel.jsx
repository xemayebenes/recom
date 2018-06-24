import React from 'react';
import { Row, Col, Button } from 'reactstrap';

const ActionsPanel = ({
  onClickDeleteButton,
  onClickCompleteButton,
  completed
}) => (
  <Row>
    <Col>
      <Button color="primary" onClick={onClickDeleteButton}>
        Delete
      </Button>
    </Col>
    <Col>
      <Button
        disabled={completed}
        color="secondary"
        onClick={onClickCompleteButton}
      >
        Mark as view
      </Button>
    </Col>
  </Row>
);

ActionsPanel.displayName = 'ActionsPanel';

ActionsPanel.propTypes = {};
export default ActionsPanel;
