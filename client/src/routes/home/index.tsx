/** @jsx h */
import { h, FunctionComponent } from 'preact';
import { Link } from 'preact-router/match';

const Home: FunctionComponent = () => (
  <div
    class="wrapper
          | h-full
          | p-8 lg:p-20
          | bg-gradient-to-br from-red-700 to-green-700
          "
  >
    <div
      class="box
            | px-8 py-4 p
            | shadow-md lg:shadow-2xl
            | border border-green-700 border-solid
            | bg-green-500 text-green-50
            | max-w-xs lg:max-w-xl mx-auto
            | transform rotate-6
            | rounded md:rounded-2xl
            "
    >
      Go to
      <Link href="/profile" class="bg-blue-900 p-4">
        your profile page
      </Link>
      to query the local test server.
    </div>
  </div>
);

export default Home;
