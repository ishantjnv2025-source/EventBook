 import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Login Response:", res.data);

            // Save JWT token
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            // Save user information
            if (res.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );
            }

            // Redirect according to role
            if (res.data.user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error("Login Error:", error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                    Login
                </h1>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    {/* Email */}
                    <div className="mb-5">

                        <label className="block font-semibold mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>


                    {/* Password */}
                    <div className="mb-6">

                        <label className="block font-semibold mb-2">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                className="w-full border border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600 text-xl"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>

                        </div>

                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>


                {/* Register Link */}
                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;