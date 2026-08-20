 function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="max-w-6xl mx-auto px-4">

        {/* EventBook */}
        <div className="text-center">

          <h2 className="text-2xl font-bold">
            EventBook
          </h2>

          <p className="mt-2 text-gray-400">
            © 2026 EventBook. All Rights Reserved.
          </p>

        </div>

        {/* Admin Information */}
        <div className="border-t border-gray-700 mt-6 pt-6">

          <h3 className="text-center text-lg font-semibold mb-4">
            Admin Information
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">

            {/* Admin */}
            <div className="flex items-center gap-2">
              <span className="text-xl">
                👤
              </span>

              <span>
                Admin — Ishant Kumar
              </span>
            </div>

            {/* Gmail */}
            <div className="flex items-center gap-2">
              <span className="text-xl">
                📧
              </span>

              <a
                href="mailto:ishantiet@gmail.com"
                className="text-gray-300 hover:text-white hover:underline"
              >
                ishantiet@gmail.com
              </a>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2">
              <span className="text-xl">
                📱
              </span>

              <a
                href="tel:+91XXXXXXXXXX"
                className="text-gray-300 hover:text-white hover:underline"
              >
                +91 XXXXXXXXXX
              </a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;