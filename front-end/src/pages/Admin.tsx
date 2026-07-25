import { useMemo, useState } from "react";
import { Search, Users, UserCheck, CheckCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce"; 
import { useLeads, useUpdateLeadStatus } from "../hooks/useLead";
import { useLogout } from "../hooks/useAuth";
import type { LeadStatus } from "../interface/lead";

const Admin = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  const [debouncedSearch] = useDebounce(search, 500);
  const { data, isLoading, isError } = useLeads(debouncedSearch);
  
  const leads = data?.data.leads ?? [];
  const updateMutation = useUpdateLeadStatus();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login", { replace: true });
      },
    });
  };

  const stats = useMemo(
    () => ({
      total: leads.length,
      contacted: leads.filter((lead) => lead.status === "Contacted").length,
      closed: leads.filter((lead) => lead.status === "Closed").length,
    }),
    [leads]
  );

  const updateStatus = (id: string, status: LeadStatus) => {
    updateMutation.mutate({ id, status });
  };

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Failed to load leads.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg">
              L
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">LeadDesk</h1>
              <p className="-mt-1 text-xs text-gray-500">Mini CRM</p>
            </div>
          </Link>
          <button
            disabled={isPending}
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Logging Out...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Logout
              </>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Leads</p>
                <h2 className="mt-2 text-3xl font-bold">{stats.total}</h2>
              </div>
              <Users className="text-indigo-600" size={40} />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Contacted</p>
                <h2 className="mt-2 text-3xl font-bold">{stats.contacted}</h2>
              </div>
              <UserCheck className="text-green-600" size={40} />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Closed</p>
                <h2 className="mt-2 text-3xl font-bold">{stats.closed}</h2>
              </div>
              <CheckCircle2 className="text-violet-600" size={40} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
              aria-hidden="true"
            />
            {/* FIX: Removed disabled={isLoading} so the input doesn't lock up and freeze user typing during fetching */}
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm uppercase tracking-wide text-gray-500">
                  <th className="px-6 py-4">Lead</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12">
                      <div className="flex items-center justify-center gap-3 text-gray-500">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                        Loading leads...
                      </div>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-t border-gray-200 transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {lead.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {lead.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-5">
                        {lead.budget}
                      </td>
                      <td className="max-w-xs px-6 py-5 text-gray-600">
                        <p className="line-clamp-2">{lead.message}</p>
                      </td>
                      <td className="px-6 py-5">
                        <select
                          disabled={updateMutation.isPending}
                          value={lead.status}
                          onChange={(e) =>
                            updateStatus(lead._id, e.target.value as LeadStatus)
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-60"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 text-gray-500">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))
                )}
                {!isLoading && leads.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      No leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
