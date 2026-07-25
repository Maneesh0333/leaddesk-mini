import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">
                L
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  LeadDesk Mini
                </h2>
                <p className="text-sm text-gray-500">
                  Simple Lead Management
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm leading-7 text-gray-600">
              Capture, organize, and manage customer inquiries with a clean,
              secure, and modern lead management platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-gray-600 transition hover:text-indigo-600"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-gray-600 transition hover:text-indigo-600"
                >
                  Contact
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-gray-600 transition hover:text-indigo-600"
                >
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-200" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © {year} LeadDesk Mini. All rights reserved.
          </p>

          {/* Assignment Requirement */}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
          >
            Built for Digital Heroes Training Task
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;