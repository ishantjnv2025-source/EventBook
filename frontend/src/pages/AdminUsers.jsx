 import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingUserId, setDeletingUserId] = useState(null);

    // ===============================
    // GET ALL USERS
    // ===============================
    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const res = await api.get("/admin/users");

            setUsers(res.data.users || []);
        } catch (error) {
            console.error("Admin Users Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load users"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // ===============================
    // LOAD USERS
    // ===============================
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // ===============================
    // DELETE USER
    // ===============================
    async function handleDeleteUser(userId, userName) {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${userName}?`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingUserId(userId);
            setError("");

            await api.delete(`/admin/users/${userId}`);

            // Remove deleted user from UI
            setUsers((currentUsers) =>
                currentUsers.filter(
                    (user) => user._id !== userId
                )
            );
        } catch (error) {
            console.error("Delete User Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to delete user"
            );
        } finally {
            setDeletingUserId(null);
        }
    }

    // ===============================
    // LOADING
    // ===============================
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                        Loading Users...
                    </div>

                    <p className="text-gray-500 mt-2">
                        Please wait
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-7xl mx-auto">

                {/* ===============================
                    HEADER
                =============================== */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                        <div>
                            <h1 className="text-4xl font-bold text-gray-800">
                                Manage Users
                            </h1>

                            <p className="text-gray-500 mt-2">
                                View and manage all EventBook users
                            </p>
                        </div>

                        <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-semibold">
                            Total Users: {users.length}
                        </div>

                    </div>

                </div>

                {/* ===============================
                    ERROR
                =============================== */}
                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-5 py-4 rounded-xl mb-6">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* ===============================
                    NO USERS
                =============================== */}
                {users.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                        <div className="text-5xl mb-4">
                            👥
                        </div>

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Users Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            There are currently no users in the system.
                        </p>

                    </div>
                ) : (
                    <>
                        {/* ===============================
                            DESKTOP TABLE
                        =============================== */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden">

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50 border-b">

                                        <tr>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                #
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                Name
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                Email
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                Role
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                User ID
                                            </th>

                                            <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody className="divide-y">

                                        {users.map((user, index) => (

                                            <tr
                                                key={user._id}
                                                className="hover:bg-gray-50 transition"
                                            >

                                                {/* Number */}
                                                <td className="px-6 py-5 font-semibold text-gray-600">
                                                    {index + 1}
                                                </td>

                                                {/* Name */}
                                                <td className="px-6 py-5">

                                                    <div className="font-semibold text-gray-800">
                                                        {user.name}
                                                    </div>

                                                </td>

                                                {/* Email */}
                                                <td className="px-6 py-5 text-gray-600">
                                                    {user.email}
                                                </td>

                                                {/* Role */}
                                                <td className="px-6 py-5">

                                                    {user.role === "admin" ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                                            User
                                                        </span>
                                                    )}

                                                </td>

                                                {/* User ID */}
                                                <td className="px-6 py-5">

                                                    <span className="text-xs text-gray-500 break-all">
                                                        {user._id}
                                                    </span>

                                                </td>

                                                {/* Action */}
                                                <td className="px-6 py-5">

                                                    {user.role === "admin" ? (

                                                        <span className="text-gray-400 text-sm font-medium">
                                                            Admin
                                                        </span>

                                                    ) : (

                                                        <button
                                                            type="button"
                                                            disabled={
                                                                deletingUserId ===
                                                                user._id
                                                            }
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user._id,
                                                                    user.name
                                                                )
                                                            }
                                                            className="bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-semibold transition"
                                                        >
                                                            {deletingUserId ===
                                                            user._id
                                                                ? "Deleting..."
                                                                : "Delete"}
                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        {/* ===============================
                            MOBILE CARDS
                        =============================== */}
                        <div className="md:hidden space-y-5">

                            {users.map((user, index) => (

                                <div
                                    key={user._id}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >

                                    {/* User Number */}
                                    <div className="flex items-center justify-between mb-5">

                                        <span className="text-sm text-gray-400">
                                            User #{index + 1}
                                        </span>

                                        {user.role === "admin" ? (
                                            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                User
                                            </span>
                                        )}

                                    </div>

                                    {/* Name */}
                                    <div className="mb-4">

                                        <p className="text-sm text-gray-400">
                                            Name
                                        </p>

                                        <p className="text-xl font-bold text-gray-800">
                                            {user.name}
                                        </p>

                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">

                                        <p className="text-sm text-gray-400">
                                            Email
                                        </p>

                                        <p className="text-gray-700 break-all">
                                            {user.email}
                                        </p>

                                    </div>

                                    {/* User ID */}
                                    <div className="mb-5">

                                        <p className="text-sm text-gray-400">
                                            User ID
                                        </p>

                                        <p className="text-xs text-gray-500 break-all mt-1">
                                            {user._id}
                                        </p>

                                    </div>

                                    {/* Delete */}
                                    {user.role === "admin" ? (

                                        <div className="text-center text-gray-400 text-sm font-medium">
                                            Admin account cannot be deleted here
                                        </div>

                                    ) : (

                                        <button
                                            type="button"
                                            disabled={
                                                deletingUserId ===
                                                user._id
                                            }
                                            onClick={() =>
                                                handleDeleteUser(
                                                    user._id,
                                                    user.name
                                                )
                                            }
                                            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 text-white py-3 rounded-lg font-semibold transition"
                                        >
                                            {deletingUserId ===
                                            user._id
                                                ? "Deleting..."
                                                : "Delete User"}
                                        </button>

                                    )}

                                </div>

                            ))}

                        </div>
                    </>
                )}

            </div>

        </div>
    );
}

export default AdminUsers;