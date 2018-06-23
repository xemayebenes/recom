import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import { Col, Row } from 'reactstrap';
import getUserMovie from 'gql/getUserMovie.gql';

export class MovieDetail extends PureComponent {
  static displayName = 'MovieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query
        variables={{ id: this.props.id, userId: this.props.userId }}
        query={getUserMovie}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          const film = data.getUserMovie.film;
          const trailers = film.videoData.filter(
            video => video.trailer !== null
          );

          return (
            <React.Fragment>
              <div>{film.title}</div>
              <div>----------------------</div>
              <img src={film.images.main} alt="main" />
              <img src={film.images.secondary} alt="secondary" />
              <div>----------------------</div>
              <div>{film.overview}</div>
              <div>----------------------</div>
              <Row>
                {film.genres.map(genre => (
                  <Col key={genre.id}>
                    <div> {genre.name} </div>
                  </Col>
                ))}
              </Row>
              <div>----------------------</div>
              <Row>
                <Col> Popularity: {film.popularity} </Col>
                <Col> Vote average: {film.vote_average}</Col>
                <Col> Imdb: {film.omdbData.imdbRating}</Col>
              </Row>
              <div>----------------------</div>
              {trailers.length > 0 && (
                <iframe
                  title="youtube"
                  type="text/html"
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailers[0].key}`}
                  frameBorder="0"
                />
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default injectIntl(MovieDetail);
