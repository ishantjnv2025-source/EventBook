import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-24">

        <div className="max-w-7xl mx-auto text-center">

          <h1 className="text-6xl font-bold mb-6">
            Welcome to EventBook
          </h1>

          <p className="text-xl mb-10">
            Discover, Create and Manage Amazing Events
          </p>

          <Link to="/events" className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-bold hover:bg-yellow-300">
            Explore Events
          </Link>

        </div>

      </section>

      {/* Features */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              🎉 Create Events
            </h2>

            <p>
              Organize workshops, seminars, hackathons and more.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              📅 Book Events
            </h2>

            <p>
              Reserve your seat in just one click.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              👨‍💻 Manage Events
            </h2>

            <p>
              Update or delete your events anytime.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;
