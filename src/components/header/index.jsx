/** @jsx h */
import { h } from 'preact';
import { Link } from 'preact-router/match';

const Header = () => (
	<header>
		<h1>Preact App</h1>
		<nav>
			<Link activeClassName='active' href="/">Home</Link>
			<Link activeClassName='active' href="/profile">Me</Link>
			<Link activeClassName='active' href="/profile/john">John</Link>
		</nav>
	</header>
);

export default Header;
