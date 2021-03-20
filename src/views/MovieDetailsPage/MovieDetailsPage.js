import { Route, Link } from 'react-router-dom';
import { Component } from 'react';
import Axios from 'axios';
import PosterDef from '../../images/posterDef.jpg';
import Cast from '../../components/Cast/Cast';
import Reviews from '../../components/Reviews/Reviews';
import styles from './MovieDetailsPage.module.css';
import 'react-notifications/lib/notifications.css';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

class MovieDetailsPage extends Component {
  state = {
    poster_path: '',
    title: '',
    userScore: '',
    overview: null,
    genres: null,
    release_date: '',
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;

    try {
      const response = await Axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=5c34acfe39a6372a620da68979c929b1&language=en-US`,
      );

      const {
        poster_path,
        title,
        vote_average,
        overview,
        genres,
        release_date,
      } = response.data;

      const userScore = Number(vote_average) * 10;
      const handleGenres = genres.map(({ name }) => name).join(', ');
      const toSliceDate = release_date.slice(0, 4);
      const posterMovie =
        poster_path === null
          ? PosterDef
          : `https://image.tmdb.org/t/p/w300/${poster_path}`;

      this.setState({
        poster_path: posterMovie,
        title,
        userScore,
        overview,
        genres: handleGenres,
        release_date: toSliceDate,
      });
    } catch {
      this.createNotification('404');
    }
  }

  createNotification = text => {
    return NotificationManager.error(text, 'Error', 5000);
  };

  handleGoBack = () => {
    const { location, history } = this.props;

    history.push(location?.state?.from || '/');
  };

  render() {
    const {
      poster_path,
      title,
      userScore,
      overview,
      genres,
      release_date,
    } = this.state;
    const { match } = this.props;

    return (
      <>
        <button
          className={styles.btn}
          type="button"
          onClick={this.handleGoBack}
        >
          <span>&larr;</span> Go back
        </button>
        <div className={styles.wrapper}>
          <img className={styles.image} src={poster_path} alt="" width="300" />

          <div className={styles.infoBox}>
            <h2>{`${title} (${release_date})`}</h2>
            <p>{`User Score: ${userScore}%`}</p>

            <h3>Overview</h3>
            <p>{overview}</p>

            <h3>Generes</h3>
            <p>{genres}</p>
          </div>
        </div>

        <div className={styles.addInfo}>
          <p>Additional information</p>

          <ul>
            <li className={styles.item}>
              <Link className={styles.link} to={`${match.url}/cast`}>
                Casts
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} to={`${match.url}/reviews`}>
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        <Route path="/movies/:movieId/cast" component={Cast} />
        <Route path="/movies/:movieId/reviews" component={Reviews} />

        <div>
          <NotificationContainer />
        </div>
      </>
    );
  }
}

export default MovieDetailsPage;
