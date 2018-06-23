import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import { Col, Row } from 'reactstrap';

import getUserSerie from 'gql/getUserSerie.gql';

export class SerieDetail extends PureComponent {
  static displayName = 'SerieDetail';

  static propTypes = {
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query
        variables={{ id: this.props.id, userId: this.props.userId }}
        query={getUserSerie}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const serie = data.getUserSerie.serie;

          return (
            <React.Fragment>
              <div>{serie.title}</div>
              <div>----------------------</div>
              <img src={serie.images.main} alt="main" />
              <img src={serie.images.secondary} alt="secondary" />
              <div>----------------------</div>
              <div>{serie.overview}</div>
              <div>----------------------</div>
              <Row>
                {serie.genres.map(genre => (
                  <Col key={genre.id}>
                    <div> {genre.name} </div>
                  </Col>
                ))}
              </Row>
              <div>----------------------</div>
              <Row>
                <Col> Popularity: {serie.popularity} </Col>
                <Col> Vote average: {serie.vote_average}</Col>
                <Col> Imdb: {serie.omdbData.imdbRating}</Col>
              </Row>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default injectIntl(SerieDetail);
