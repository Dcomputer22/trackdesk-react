const Footer = () => {
  return (
    <footer className="bg-green-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">TrackDesk</h3>
            <p className="text-sm">Ticket management made easy!</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Tickets
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">support@fdigitals.com</p>
          </div>
        </div>

        <div className="border-t border-white mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Fatima Oyiza Jimoh. HNG Stage-2 Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
