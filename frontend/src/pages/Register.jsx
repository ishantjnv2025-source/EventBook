  import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password,
            });

            console.log("Register Response:", res.data);

            setSuccess(
                res.data.message ||
                "Registration successful!"
            );

            // Clear form
            setName("");
            setEmail("");
            setPassword("");

            // Go to login after registration
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            console.error("Register Error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                    Register
                </h1>


                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
                        {error}
                    </div>
                )}


                {/* Success */}
                {success && (
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-5 text-center">
                        {success}
                    </div>
                )}


                <form onSubmit={handleRegister}>

                    {/* Name */}
                    <div className="mb-5">

                        <label className="block font-semibold mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />

                    </div>


                    {/* Email */}
                    <div className="mb-5">

                        <label className="block font-semibold mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
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
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Create a password"
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


                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>


                {/* Login Link */}
                <p className="text-center mt-6 text-gray-600">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;