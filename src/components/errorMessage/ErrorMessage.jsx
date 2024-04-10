import PropTypes from 'prop-types';
const ErrorMessage = ({
  message = 'Oops, something went wrong, please reload the page!',
}) => {
  return <p>{message}</p>;
};

export default ErrorMessage;

ErrorMessage.proptypes = {
  message: PropTypes.string.isRequired,
};
