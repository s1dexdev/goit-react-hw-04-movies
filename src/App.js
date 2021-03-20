import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-page" */
  ),
);
const Header = lazy(() =>
  import('./components/Header/Header.js' /* webpackChunkName: "header" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "Mmvie-details-page" */
  ),
);

const App = () => (
  <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={HomePage} />
      </Switch>
    </Suspense>
  </>
);

export default App;
