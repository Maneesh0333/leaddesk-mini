import {
  BadgeCheck,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Lead Tracking",
    description:
      "Capture and organize every customer inquiry in one place without losing important details.",
  },
  {
    icon: Search,
    title: "Quick Search",
    description:
      "Instantly find leads using powerful search by name or email and manage them efficiently.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Admin",
    description:
      "Protect your lead data with secure authentication and restricted dashboard access.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
            Why LeadDesk?
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Everything You Need to Manage Leads
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            A simple yet powerful platform to capture,
            organize, and track potential clients from
            inquiry to conversion.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>

                <button className="mt-6 font-semibold text-indigo-600 transition hover:text-indigo-700">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Statistics */}
        <div className="mt-24 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-10 text-white">
          <div className="grid gap-10 text-center md:grid-cols-3">
            <div>
              <h3 className="text-4xl font-bold">100+</h3>
              <p className="mt-2 text-indigo-100">
                Leads Captured
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">98%</h3>
              <p className="mt-2 text-indigo-100">
                Customer Satisfaction
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="mt-2 text-indigo-100">
                Dashboard Availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;