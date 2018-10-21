import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Badge,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import { withStateHandlers, compose, withHandlers } from 'recompose';
import classnames from 'classnames';

import {
  imageShape,
  omdbDataShape,
  videoDataShape,
  genreShape
} from 'modules/global/proptypes';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faImdb from '@fortawesome/fontawesome-free-brands/faImdb';
import faYoutube from '@fortawesome/fontawesome-free-brands/faYoutube';
import faChartLine from '@fortawesome/fontawesome-free-solid/faChartLine';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faCheckCircle from '@fortawesome/fontawesome-free-regular/faCheckCircle';
import faShareAlt from '@fortawesome/fontawesome-free-solid/faShareAlt';
import faTrashAlt from '@fortawesome/fontawesome-free-regular/faTrashAlt';

import tmdbIcon from 'assets/tmdb.svg';
import styles from './MovieData.mod.css';

const MovieData = ({
  externalId,
  images,
  title,
  overview,
  popularity,
  vote_average,
  omdbData,
  videoData,
  genres,
  completed,
  handleClickDeleteButton,
  handleClickCompleteButton,
  handleClickShareButton,
  toggleModal,
  showModal,
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
          genres.map((genre, index) => (
            <div key={genre.id} className={classnames(styles.badge, 'mr-2')}>
              <Badge color={index % 2 === 0 ? 'primary' : 'secondary'}>
                {genre.name}
              </Badge>
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
      <div className="d-flex justify-content-between">
        <div className="p-2 d-flex flex-column flex-wrap justify-content-between">
          {popularity && (
            <div className="mb-1">
              <FontAwesomeIcon icon={faChartLine} className={styles.icon} />
              {popularity}
            </div>
          )}
          {vote_average && (
            <div className="mb-2">
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
        {videoData &&
          videoData.length > 0 && (
            <div
              className="p-2 d-flex align-items-baseline"
              onClick={toggleModal}
            >
              <div className="mr-3 fa-xs">
                <FontAwesomeIcon
                  icon={faYoutube}
                  className={classnames(styles.icon, styles.youtubeIcon)}
                />
              </div>
              <div className="text-uppercase"> TRAILER</div>
            </div>
          )}
        <div className="p-2 d-flex align-items-baseline">
          <div className="mr-3 fa-xs">
            <a
              href={`https://www.themoviedb.org/movie/${externalId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tmdbIcon} alt="tmdbIcon" className={styles.tmdbIcon} />
            </a>
          </div>
          <div className="text-uppercase"> TMDB PAGE</div>
        </div>
      </div>
    </Container>
    {showModal && (
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
        <ModalBody>
          <div className={styles.videoWrapper}>
            <iframe
              title="youtube"
              type="text/html"
              src={`https://www.youtube.com/embed/${videoData[0].key}`}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <a
            href={videoData[0].trailer}
            target="_blank"
            rel="noopener noreferrer"
          >
            See on youtube
          </a>
        </ModalFooter>
      </Modal>
    )}
  </React.Fragment>
);

MovieData.displayName = 'MovieData';

MovieData.propTypes = {
  externalId: PropTypes.number.isRequired,
  images: imageShape.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  popularity: PropTypes.number,
  vote_average: PropTypes.number,
  omdbData: omdbDataShape,
  videoData: videoDataShape,
  genres: genreShape,
  completed: PropTypes.bool,
  onClickDeleteButton: PropTypes.func,
  onClickCompleteButton: PropTypes.func,
  onClickShare: PropTypes.func,
  search: PropTypes.bool
};

export default compose(
  withStateHandlers(
    {
      showModal: false
    },
    {
      toggleModal: ({ showModal }) => () => ({ showModal: !showModal })
    }
  ),
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
)(MovieData);
