 import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await api.get("/admin/users");

            console.log("Admin Users:", res.data);

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
    }

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">

                    <div className="text-5xl mb-4">
                        ⏳
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-700">
                        Loading Users...
                    </h1>

                </div>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================
    if (error) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">

                <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">

                    <div className="text-5xl mb-4">
                        ⚠️
                    </div>

                    <h1 className="text-2xl font-bold text-red-600 mb-3">
                        Unable to Load Users
                    </h1>

                    <p className="text-gray-700">
                        {error}
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            {/* =========================
                HEADER
            ========================== */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Manage Users
                </h1>

                <p className="text-gray-500 mt-2">
                    View all registered EventBook users
                </p>

            </div>


            {/* =========================
                USER COUNT
            ========================== */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-blue-600 font-medium">
                            Total Registered Users
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-1">
                            {users.length}
                        </p>
                    </div>

                    <div className="text-5xl">
                        👥
                    </div>

                </div>

            </div>


            {/* =========================
                NO USERS
            ========================== */}
            {users.length === 0 ? (

                <div className="bg-white border rounded-xl p-10 text-center">

                    <div className="text-5xl mb-4">
                        👤
                    </div>

                    <h2 className="text-2xl font-bold text-gray-700">
                        No Users Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        There are currently no registered users.
                    </p>

                </div>

            ) : (

                <>
                    {/* =========================
                        DESKTOP TABLE
                    ========================== */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden border">

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-gray-100">

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

                                    </tr>

                                </thead>


                                <tbody className="divide-y">

                                    {users.map((user, index) => (

                                        <tr
                                            key={user._id}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            <td className="px-6 py-5">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        👤
                                                    </div>

                                                    <span className="font-semibold text-gray-800">
                                                        {user.name}
                                                    </span>

                                                </div>

                                            </td>

                                            <td className="px-6 py-5 text-gray-600">
                                                {user.email}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                        user.role === "admin"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                                                    {user.role || "user"}
                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                <span className="text-xs text-gray-500">
                                                    {user._id}
                                                </span>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* =========================
                        MOBILE CARDS
                    ========================== */}
                    <div className="md:hidden space-y-4">

                        {users.map((user, index) => (

                            <div
                                key={user._id}
                                className="bg-white rounded-xl shadow-md border p-5"
                            >

                                <div className="flex items-center justify-between mb-4">

                                    <div className="flex items-center gap-3">

                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                                            👤
                                        </div>

                                        <div>

                                            <h2 className="font-bold text-lg text-gray-800">
                                                {user.name}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                User #{index + 1}
                                            </p>

                                        </div>

                                    </div>


                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            user.role === "admin"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                    >
                                        {user.role || "user"}
                                    </span>

                                </div>


                                <div className="border-t pt-4">

                                    <p className="text-sm text-gray-500">
                                        Email
                                    </p>

                                    <p className="font-medium text-gray-800 mb-3">
                                        {user.email}
                                    </p>


                                    <p className="text-sm text-gray-500">
                                        User ID
                                    </p>

                                    <p className="text-xs text-gray-600 break-all">
                                        {user._id}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>
                </>

            )}

        </div>
    );
}

export default AdminUsers;