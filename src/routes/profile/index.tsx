/** @jsx h */
import { h, FunctionComponent } from 'preact';
import { useEffect, useState } from "preact/hooks";

// Note: `user` comes from the URL, courtesy of our router
// so it is actually only a string containing a name, not a user object,
// based on the example created by preact cli default.

const Profile: FunctionComponent<{ user?: string }> = ({ user }) => {
	const [time, setTime] = useState(Date.now());
	const [count, setCount] = useState(10);

	useEffect(() => {
		let timer = setInterval(() => setTime(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div>
			<h1>Profile: {user}</h1>
			<p>This is the user profile for a user named { user }.</p>

			<div>Current time: {new Date(time).toLocaleString()}</div>

			<p>
				<button onClick={() => setCount((count) => count + 1)}>Click Me</button>
				{' '}
				Clicked {count} times.
			</p>
		</div>
	);
}

export default Profile;
