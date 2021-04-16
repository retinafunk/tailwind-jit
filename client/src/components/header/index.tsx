/** @jsx h */
import { h, FunctionComponent } from 'preact';
import { Link } from 'preact-router/match';

const Header: FunctionComponent = () => (
  <header class="flex-grow-0">
    <h1>Preact App</h1>
    <nav class="w-full flex">
      <Link className="p-4" activeClassName="bg-blue-900" href="/">
        Home
      </Link>
      <Link className="p-4" activeClassName="bg-blue-900" href="/profile">
        Me
      </Link>
      <Link className="p-4" activeClassName="bg-blue-900" href="/profile/john">
        John
      </Link>
    </nav>
  </header>
);

export default Header;
