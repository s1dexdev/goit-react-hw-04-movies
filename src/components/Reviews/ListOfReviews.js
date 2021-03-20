import PropTypes from 'prop-types';

const ListOfReviews = ({ reviews }) => {
  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h2>{`Author: ${author}.`}</h2>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

ListOfReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
};

export default ListOfReviews;
