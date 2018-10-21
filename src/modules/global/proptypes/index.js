import PropTypes from 'prop-types';

export const imagesType = PropTypes.shape({
  main: PropTypes.string,
  secondary: PropTypes.string
});
export const imageShape = PropTypes.shape({
  large: imagesType,
  medium: imagesType,
  small: imagesType
});
export const omdbDataShape = PropTypes.shape({
  imdbRating: PropTypes.number
});
export const videoDataShape = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.string,
    trailer: PropTypes.string
  })
);
export const genreShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
);
