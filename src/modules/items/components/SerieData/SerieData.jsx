import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const SerieData = ({
  externalId,
  images,
  title,
  overview,
  popularity,
  vote_average,
  omdbData,
  genres
}) => (
  <React.Fragment>
    <div>{title}</div>
    <div>----------------------</div>
    <img src={images.large.main} alt="main" />
    <img src={images.large.secondary} alt="secondary" />
    <div>----------------------</div>
    <div>{overview}</div>
    <div>----------------------</div>
    <Row>
      {genres &&
        genres.map(genre => (
          <Col key={genre.id}>
            <div> {genre.name} </div>
          </Col>
        ))}
    </Row>
    <div>----------------------</div>
    <Row>
      <Col> Popularity: {popularity} </Col>
      <Col> Vote average: {vote_average}</Col>
      {omdbData && <Col> Imdb: {omdbData.imdbRating}</Col>}
    </Row>
  </React.Fragment>
);

SerieData.displayName = 'SerieData';

SerieData.propTypes = {};
export default SerieData;
