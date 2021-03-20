import { Component } from 'react';
import Axios from 'axios';
import Photo from '../../images/person.jpg';
import styles from './Cast.module.css';

class Cast extends Component {
  state = {
    actors: [],
  };

  async componentDidMount() {
    const { movieId } = this.props.match.params;
    const response = await Axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5c34acfe39a6372a620da68979c929b1&language=en-US`,
    );

    this.setState({ actors: response.data.cast.slice(0, 10) });
  }

  render() {
    const { actors } = this.state;

    return (
      <ul className={styles.list}>
        {actors.map(({ id, character, name, profile_path }) => {
          const urlAvatar =
            profile_path === null
              ? Photo
              : `https://image.tmdb.org/t/p/w300/${profile_path}`;

          return (
            <li key={id}>
              <img src={urlAvatar} alt="" width="150" />
              <p className={styles.actorName}>{name}</p>
              <p>{`Character: ${character}`}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cast;
