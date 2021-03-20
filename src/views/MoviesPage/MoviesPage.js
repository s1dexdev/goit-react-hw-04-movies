import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import styles from './MoviesPage.module.css';

class MoviesPage extends Component {
  static propTypes = {
    input: PropTypes.string,
    movies: PropTypes.array,
  };

  state = {
    input: '',
    movies: [],
  };

  createNotification = text => {
    return NotificationManager.error(text, 'Error', 5000);
  };

  handleInput = event => {
    const value = event.target.value;

    this.setState({ input: value });
  };

  fetchMovie = async () => {
    const { input } = this.state;

    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${input}&api_key=5c34acfe39a6372a620da68979c929b1&language=en-US&page=1&include_adult=false`,
      );

      if (response.data.results.length === 0) {
        this.createNotification('Movie not found');
        return;
      }

      this.setState({ movies: [...response.data.results] });
    } catch {
      this.createNotification('404');
    }
  };

  render() {
    const { input, movies } = this.state;
    const { location } = this.props;

    return (
      <>
        <div className={styles.wrapper}>
          <input
            className={styles.input}
            type="text"
            value={input}
            onChange={this.handleInput}
          />
          <button type="button" onClick={this.fetchMovie}>
            Search
          </button>
        </div>
        <ul>
          {movies.map(({ id, title }) => (
            <li className={styles.item} key={id}>
              <Link
                className={styles.link}
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default withRouter(MoviesPage);
