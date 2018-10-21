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
