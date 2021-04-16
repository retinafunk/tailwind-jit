/** @jsx h */
import { h } from 'preact';
import { Router } from 'preact-router';
// import './index.css'; // import directly in html head

import Header from './components/header';

// Code-splitting is automated for `routes` directory
import Home from './routes/home';
import Profile from './routes/profile';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Profile path="/profile/" user="me" />
      <Profile path="/profile/:user" />
    </Router>
    <div>
      some code inside (p)react app, but outside router
    </div>
  </div>
);

export default App;
