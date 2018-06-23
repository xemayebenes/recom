import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { MOVIE, SERIE } from 'modules/constants';

const SearchItem = ({ item, type, onSelectItem }) => (
  <React.Fragment>
    <Row className="border-bottom" onClick={() => onSelectItem(item)}>
      <Col xs="2">
        <img src={item.images.main} width="50" alt={item.title} />
      </Col>
      <Col xs="7">{item.title}</Col>
      <Col xs="3">
        {type === MOVIE && <div> {item.release_date} </div>}
        {type === SERIE && <div> {item.first_air_date} </div>}
      </Col>
    </Row>
  </React.Fragment>
);

SearchItem.displayName = 'SearchItem';

SearchItem.propTypes = {};
export default SearchItem;
