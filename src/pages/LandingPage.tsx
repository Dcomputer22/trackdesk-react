import Hero from '../components/Hero';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="max-w-[1440px] min-h-screen flex flex-col">
      <Hero />

      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full opacity-40 blur-3xl -translate-y-1/3 translate-x-1/3"
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600">
                Create, edit, delete and track tickets seamlessly
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed at all times</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected and always available
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
