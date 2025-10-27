import Hero from '../components/Hero';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <section className="max-w-[1440px] min-h-screen flex flex-col">
      <Hero />

      <section className="relative py-20 overflow-hidden">
        <section
          className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300 rounded-full opacity-40 blur-3xl translate-y-1/2 -translate-x-1/4"
          aria-hidden="true"
        />
        <section
          className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full opacity-40 blur-3xl -translate-y-1/3 translate-x-1/3"
          aria-hidden="true"
        />

        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Key Features
          </h2>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Easy Management</h3>
              <p className="text-gray-600">
                Create, edit, delete and track tickets seamlessly
              </p>
            </section>
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600">Stay informed at all times</p>
            </section>
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected and always available
              </p>
            </section>
          </section>
        </section>
      </section>

      <Footer />
    </section>
  );
};

export default LandingPage;
