/** @jsx h */
import { h, FunctionComponent } from 'preact';
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
      Go to your _profile_page_ to query the local test server.
    </div>
  </div>
);

export default Home;
