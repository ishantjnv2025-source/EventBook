 import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [otp, setOtp] = useState("");
    const [otpStep, setOtpStep] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ===============================
    // STEP 1: LOGIN + SEND OTP
    // ===============================
    async function handleLogin(e) {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Login Response:", res.data);

            setSuccess(
                res.data.message ||
                "OTP sent successfully. Check your email."
            );

            setOtpStep(true);

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

    // ===============================
    // STEP 2: VERIFY OTP
    // ===============================
    async function handleOtpSubmit(e) {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const res = await api.post(
                "/auth/verify-login-otp",
                {
                    email,
                    otp,
                }
            );

            console.log("OTP Verification Response:", res.data);

            // ===============================
            // SAVE JWT
            // ===============================
            if (res.data.token) {
                localStorage.setItem(
                    "token",
                    res.data.token
                );
            }

            // ===============================
            // SAVE USER
            // ===============================
            if (res.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(res.data.user)
                );
            }

            setSuccess(
                res.data.message ||
                "Login successful!"
            );

            // ===============================
            // REDIRECT
            // ===============================
            if (res.data.user?.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            console.error(
                "OTP Verification Error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Invalid or expired OTP"
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

                {/* ERROR */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-5 text-center">
                        {error}
                    </div>
                )}

                {/* SUCCESS */}
                {success && (
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-5 text-center">
                        {success}
                    </div>
                )}

                {/* ===============================
                    STEP 1
                =============================== */}

                {!otpStep ? (

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}

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


                        {/* PASSWORD */}

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
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600 text-xl"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword
                                        ? "🙈"
                                        : "👁️"}
                                </button>

                            </div>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
                        >
                            {loading
                                ? "Sending OTP..."
                                : "Login"}
                        </button>

                    </form>

                ) : (

                    /* ===============================
                       STEP 2
                    =============================== */

                    <form onSubmit={handleOtpSubmit}>

                        <p className="text-center text-gray-600 mb-5">
                            Enter the 6-digit OTP sent to:
                        </p>

                        <p className="text-center font-semibold text-blue-600 mb-5">
                            {email}
                        </p>


                        {/* OTP */}

                        <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 6)
                                )
                            }
                            maxLength="6"
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg text-center tracking-[0.4em] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
                        />


                        {/* VERIFY BUTTON */}

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                otp.length !== 6
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold p-3 rounded-lg transition"
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify and Login"}
                        </button>


                        {/* CHANGE EMAIL */}

                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => {
                                setOtpStep(false);
                                setOtp("");
                                setError("");
                                setSuccess("");
                            }}
                            className="w-full text-blue-600 py-3 mt-3 hover:underline"
                        >
                            Use a different email
                        </button>

                    </form>

                )}


                {/* REGISTER LINK */}

                {!otpStep && (
                    <p className="text-center mt-6 text-gray-600">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Register
                        </Link>

                    </p>
                )}

            </div>

        </div>
    );
}

export default Login;