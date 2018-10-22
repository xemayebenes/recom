import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { Container, Badge, Button } from 'reactstrap';
import { compose, withHandlers } from 'recompose';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImdb from '@fortawesome/fontawesome-free-brands/faImdb';
import faChartLine from '@fortawesome/fontawesome-free-solid/faChartLine';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';

import tmdbIcon from 'assets/tmdb.svg';
import styles from './SerieData.mod.css';
const SerieData = ({
  externalId,
  images,
  title,
  overview,
  popularity,
  vote_average,
  omdbData,
  genres,
  completed,
  handleClickDeleteButton,
  handleClickCompleteButton,
  handleClickShareButton,
  search = false
}) => (
  <React.Fragment>
    <div
      style={{ backgroundImage: `url(${images.large.secondary})` }}
      className={classnames(
        styles.images,
        'd-flex flex-column justify-content-center align-items-center'
      )}
    >
      <div className={classnames('text-center', styles.title)}>{title}</div>
      {search === false && (
        <div className="mr-2 mr-md-5 d-flex flex-column align-self-end">
          <Button
            disabled={completed}
            size="sm"
            color="secondary"
            onClick={handleClickCompleteButton}
            className="mb-1"
          >
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <div className="text-uppercase"> Seen</div>
            </div>
          </Button>

          <Button
            size="sm"
            color="primary"
            onClick={handleClickDeleteButton}
            className="mb-1"
          >
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div className="text-uppercase"> Remove</div>
            </div>
          </Button>
          <Button size="sm" color="secondary" onClick={handleClickShareButton}>
            <div className="d-flex align-items-baseline">
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon icon={faShareAlt} />
              </div>
              <div className="text-uppercase"> Share</div>
            </div>
          </Button>
        </div>
      )}
    </div>
    <Container>
      <div className="p-2 d-flex flex-row flex-wrap justify-content-start">
        {genres &&
          genres.map(genre => (
            <div key={genre.id} className="mr-2 fa-2x">
              <Badge color="primary">{genre.name} </Badge>
            </div>
          ))}
      </div>
      <div className="p-2">
        <img
          src={images.large.main}
          alt="main"
          className={classnames(styles.image, 'float-right', 'pl-2', 'mb-2')}
        />
        <div className="text-justify">{overview}</div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <div className="p-2 d-flex flex-wrap justify-content-end">
          {popularity && (
            <div className="mr-3">
              <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
              {popularity}
            </div>
          )}
          {vote_average && (
            <div className="mr-3">
              <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />
              {vote_average}
            </div>
          )}
          {omdbData &&
            omdbData.imdbRating && (
              <div>
                <FontAwesomeIcon icon={faImdb} className={styles.icon} />
                {omdbData.imdbRating}
              </div>
            )}
        </div>
        <div className="p-2 d-flex flex-wrap justify-content-start align-items-baseline">
          <div className="mr-3 fa-xs">
            <a
              href={`https://www.themoviedb.org/tv/${externalId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tmdbIcon} alt="tmdbIcon" className={styles.tmdbIcon} />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </React.Fragment>
);

SerieData.displayName = 'SerieData';

SerieData.propTypes = {};

export default compose(
  withHandlers({
    handleClickDeleteButton: props => event => {
      event.stopPropagation();
      props.onClickDeleteButton(props.id);
    },
    handleClickCompleteButton: props => event => {
      event.stopPropagation();
      props.onClickCompleteButton(props.id);
    },
    handleClickShareButton: props => event => {
      event.stopPropagation();
      props.onClickShare(props.externalId, props.title);
    }
  })
)(SerieData);
