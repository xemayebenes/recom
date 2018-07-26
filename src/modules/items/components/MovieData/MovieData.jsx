import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const MovieData = ({
  externalId,
  images,
  title,
  overview,
  popularity,
  vote_average,
  omdbData,
  videoData,
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
    <div>----------------------</div>
    {videoData &&
      videoData.length > 0 && (
        <iframe
          title="youtube"
          type="text/html"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoData[0].key}`}
          frameBorder="0"
        />
      )}
  </React.Fragment>
);

MovieData.displayName = 'MovieData';

MovieData.propTypes = {};
export default MovieData;
