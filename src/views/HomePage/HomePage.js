import { Link, withRouter } from 'react-router-dom';
import { Component } from 'react';
import Axios from 'axios';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const response = await Axios.get(
      'https://api.themoviedb.org/3/trending/all/day?api_key=5c34acfe39a6372a620da68979c929b1',
    );

    this.setState({ movies: response.data.results });
  }

  render() {
    const { movies } = this.state;
    const { location } = this.props;

    return (
      <>
        <h2>Trending today</h2>
        <ul className={styles.list}>
          {movies.map(({ id, original_title, original_name }) => (
            <li className={styles.item} key={id}>
              <Link
                className={styles.link}
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
                {original_title || original_name}
              </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default withRouter(HomePage);
