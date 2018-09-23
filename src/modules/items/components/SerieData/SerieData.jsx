import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { Container, Badge, Button } from 'reactstrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImdb from '@fortawesome/fontawesome-free-brands/faImdb';
import faChartLine from '@fortawesome/fontawesome-free-solid/faChartLine';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';

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
  onClickDeleteButton,
  onClickCompleteButton,
  onClickShare,
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
      <div className={styles.title}>{title}</div>
    </div>
    <Container>
      {search === false && (
        <div className="p-2 float-right">
          <Button
            outline
            size="sm"
            color="primary"
            onClick={onClickDeleteButton}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
          <Button
            disabled={completed}
            outline
            size="sm"
            color="secondary"
            onClick={onClickCompleteButton}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
          <Button outline size="sm" color="secondary" onClick={onClickShare}>
            <FontAwesomeIcon icon={faShareAlt} />
          </Button>
        </div>
      )}
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
      <div className="p-2 d-flex flex-row flex-wrap justify-content-between">
        {popularity && (
          <div>
            <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
            {popularity}
          </div>
        )}
        {vote_average && (
          <div>
            <FontAwesomeIcon icon={faThumbsUp} className={styles.icon} />
            {vote_average}
          </div>
        )}
        {omdbData && (
          <div>
            <FontAwesomeIcon icon={faImdb} className={styles.icon} />
            {omdbData.imdbRating}
          </div>
        )}
      </div>
    </Container>
  </React.Fragment>
);

SerieData.displayName = 'SerieData';

SerieData.propTypes = {};
export default SerieData;
