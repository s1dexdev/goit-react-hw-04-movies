import { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import ListOfReviews from './ListOfReviews';

class Reviews extends Component {
  static propTypes = {
    reviews: PropTypes.array,
  };

  state = {
    reviews: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=5c34acfe39a6372a620da68979c929b1&language=en-US&page=1`,
    );
    const fetchResult = response.data.results.length !== 0;

    if (fetchResult) {
      this.setState({ reviews: [...response.data.results] });
    }
  }

  render() {
    const { reviews } = this.state;
    const hasReview = reviews.length !== 0;
    const message = 'We don`t have any reviews for this movie';

    return (
      <>{hasReview ? <ListOfReviews reviews={reviews} /> : <p>{message}</p>}</>
    );
  }
}

export default Reviews;
