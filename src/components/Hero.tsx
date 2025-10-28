import WavySvg from '../assets/WavySvg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-indigo-600 text-white overflow-hidden min-h-[600px] flex items-center flex-col">
      <section
        className="absolute top-0 right-0 w-96 h-96 bg-pink-400 rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/4"
        aria-hidden="true"
      />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10 w-full">
        <section className="">
          <section className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              TrackDesk
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-purple-100">
              Where your tickets are effortlessly managed with our powerful and
              intuitive platform
            </p>
          </section>

          <section className="mt-20 flex flex-col gap-5 sm:flex-row">
            <Link
              to={'auth/signup'}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:border-2 hover:border-purple-600 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to={'auth/login'}
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Login
            </Link>
          </section>
        </section>
      </section>

      <section className="absolute bottom-0 left-0 w-full">
        <WavySvg />
      </section>
    </section>
  );
};

export default Hero;
