import { Eye, SearchIcon, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TableRowSkeleton } from "../../components/common/Skeletons";
import type { AdminUser as User } from "../../types/allTypes";
import toast from 'react-hot-toast';
import { getAdminUsers, updateAdminUserStatus } from "../../services/authService";

const mockUsers: User[] = [
  {
    id: "USR-1001",
    name: "Junaid Haque",
    email: "junaid@example.com",
    date: "2026-01-15",
    ordersCount: 15,
    totalSpent: 1249.50,
    status: "Active",
  },
  {
    id: "USR-1002",
    name: "Sarah Connor",
    email: "sarah@example.com",
    date: "2026-03-22",
    ordersCount: 8,
    totalSpent: 450.00,
    status: "Active",
  },
  {
    id: "USR-1003",
    name: "John Doe",
    email: "john.doe@example.com",
    date: "2026-05-10",
    ordersCount: 1,
    totalSpent: 99.00,
    status: "Inactive",
  },
  {
    id: "USR-1004",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2025-11-05",
    ordersCount: 42,
    totalSpent: 8750.20,
    status: "Active",
  },
  {
    id: "USR-1005",
    name: "Alice Cooper",
    email: "alice@example.com",
    date: "2026-05-28",
    ordersCount: 0,
    totalSpent: 0.00,
    status: "Suspended",
  }
];

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Admin | All Users";
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAdminUsers();
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Failed to fetch users", error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateStatus = async (userId: string, newStatus: User["status"]) => {
    try {
      await updateAdminUserStatus(userId, newStatus);
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)));
      toast.success("User status updated successfully");
    } catch (error) {
      console.error("Failed to update user status", error);
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((u) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      u.name.toLowerCase().includes(searchLower) ||
      u.email.toLowerCase().includes(searchLower) ||
      u.id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-5 w-full min-h-screen overflow-x-hidden ">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
        <div className="flex items-center justify-start gap-2 text-stone-900">
          <Users2 size={28} />
          <h1 className="text-2xl font-medium text-nowrap">All Users</h1>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto gap-3">
          <input
            className="w-full md:w-[220px] rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-sm text-stone-700 focus:outline-none focus:border-stone-900 transition"
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button className="rounded-full bg-stone-900 px-4 py-2 text-sm text-stone-50 border border-stone-900 hover:bg-stone-800 transition flex items-center justify-center gap-2 cursor-pointer" type="button">
            <SearchIcon size={18} /> Search
          </button>
        </div>
      </div>

      <div className="hidden md:block w-full overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
        <table className="min-w-175 w-full table-auto border-separate border-spacing-y-0">
          <thead className="bg-stone-100">
            <tr className="text-left text-sm uppercase tracking-[0.15em] text-stone-500">
              <th className="px-5 py-4">User ID</th>
              <th className="px-5 py-4">Joined Date</th>
              <th className="px-5 py-4">User Details</th>
              <th className="px-5 py-4">Total Orders</th>
              <th className="px-5 py-4">Total Spent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={7} />
              ))
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="rounded-3xl overflow-hidden border border-stone-100 bg-white transition">
                  <td className="px-5 py-5 align-top">
                    <div className="font-semibold text-stone-900">{user.id}</div>
                  </td>
                  <td className="px-5 py-5 align-top text-stone-700">{user.date}</td>
                  <td className="px-5 py-5 align-top">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-700">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900 flex items-center gap-2">
                          {user.name}
                          {user.role === 'admin' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">Admin</span>
                          )}
                        </div>
                        <div className="text-xs text-stone-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top text-stone-700">{user.ordersCount}</td>
                  <td className="px-5 py-5 align-top text-stone-900 font-semibold">
                    ${user.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-5 align-top">
                    <select
                      value={user.status}
                      onChange={(e) => updateStatus(user.id, e.target.value as User["status"])}
                      className="rounded-full border border-stone-200 bg-stone-100 px-3 py-2 text-sm text-stone-700 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </td>
                  <td className="px-5 py-5 align-top text-right">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300 hover:text-stone-900"
                      aria-label="Show user details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border border-stone-200 bg-white rounded-2xl animate-pulse space-y-3">
              <div className="w-1/3 h-4 bg-stone-200 rounded" />
              <div className="w-2/3 h-4 bg-stone-200 rounded" />
              <div className="w-1/2 h-4 bg-stone-200 rounded" />
            </div>
          ))
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-900">{user.id}</span>
                <span className="text-xs text-stone-500">{user.date}</span>
              </div>
              <div className="flex items-center gap-3 py-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-700">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-stone-900 flex items-center gap-2">
                    <span className="truncate">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200 shrink-0">Admin</span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 truncate">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-stone-100">
                <span className="text-stone-600">Orders: <b className="text-stone-900">{user.ordersCount}</b></span>
                <span className="text-stone-600">Spent: <b className="text-stone-900">${user.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <select
                  value={user.status}
                  onChange={(e) => updateStatus(user.id, e.target.value as User["status"])}
                  className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs text-stone-700 focus:outline-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition hover:border-stone-300 hover:text-stone-900"
                  aria-label="Show user details"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 shadow-sm rounded-3xl border-2 border-stone-200 bg-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 text-center md:text-left">User Summary</h3>
          <p className="text-sm text-stone-500 text-center md:text-left">Overview of user demographics and spending</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center md:text-right">
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-500">Active Users</p>
            <p className="text-2xl font-bold text-stone-900">
              {users.filter(u => u.status === "Active").length} / {users.length}
            </p>
          </div>
          <div className="h-px w-8 bg-stone-200 sm:h-8 sm:w-px" />
          <div>
            <p className="text-sm uppercase tracking-widest text-stone-500">Total Customer Value</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${users.reduce((acc, u) => acc + u.totalSpent, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;