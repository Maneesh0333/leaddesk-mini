import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 lg:flex-row lg:justify-between lg:py-32">
        {/* Left Content */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700">
            🚀 Smart Lead Management
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
            Capture Leads.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Close More Clients.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            LeadDesk helps agencies and freelancers collect inquiries,
            organize prospects, and manage every lead from first contact to
            closed deal—all in one simple dashboard.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-indigo-700"
            >
              Get Started
              <ArrowRight size={18} />
            </a>

            <a
              href="#features"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600"
            >
              Learn More
            </a>
          </div>

          {/* Highlights */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>No setup fees</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Secure dashboard</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Instant lead tracking</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="mt-16 w-full max-w-md lg:mt-0">
          <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold text-gray-900">
              Today's Activity
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Live overview of your incoming leads.
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">New Leads</p>
                <h2 className="mt-1 text-3xl font-bold text-indigo-600">24</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-sm text-gray-500">Contacted</p>
                  <h3 className="text-2xl font-bold text-green-600">15</h3>
                </div>

                <div className="rounded-xl bg-violet-50 p-4">
                  <p className="text-sm text-gray-500">Closed</p>
                  <h3 className="text-2xl font-bold text-violet-600">8</h3>
                </div>
              </div>

              <div className="rounded-xl bg-indigo-600 p-4 text-white">
                <p className="text-sm opacity-80">Conversion Rate</p>
                <h2 className="mt-1 text-3xl font-bold">67%</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;