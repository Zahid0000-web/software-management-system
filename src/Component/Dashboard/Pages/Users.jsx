import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-02-20",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2024-03-10",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Moderator",
      status: "Active",
      joinDate: "2024-04-05",
    },
    {
      id: 5,
      name: "Tom Brown",
      email: "tom@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-05-12",
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Users Management
      </h1>

      {/* Search and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="bg-transparent ml-2 outline-none text-gray-700 w-full"
          />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Join Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {user.joinDate}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                    <FiEdit2 size={18} />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
