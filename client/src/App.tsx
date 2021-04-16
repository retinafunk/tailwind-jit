/** @jsx h */
import { h } from 'preact';
import { Router } from 'preact-router';
// import './index.css'; // import directly in html head

import Header from './components/header';

// Code-splitting is automated for `routes` directory
import Home from './routes/home';
import Profile from './routes/profile';

const App = () => (
  <div id="app" class="flex-col items-stretch absolute w-full min-h-full">
    <Header />
    <div class="flex-grow">
      <Router>
        <Home path="/" />
        <Profile path="/profile/" user="me" />
        <Profile path="/profile/:user" />
      </Router>
    </div>
    <div>
      some code inside (p)react app, but outside router
    </div>
  </div>
);

export default App;
