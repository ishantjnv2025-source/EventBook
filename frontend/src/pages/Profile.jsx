 import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {

    const navigate = useNavigate();

    const [user, setUser] =useState({});
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {

            const res = await api.get("/users/profile");

            setUser(res.data.user);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };

    const updateProfile = async () => {

        try {

            const res = await api.put("/users/profile", {
                name: user.name,
                email: user.email,
            });

            alert(res.data.message);

            setUser(res.data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            setEditMode(false);

        } catch (error) {

            alert(error.response?.data?.message || "Update Failed");

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    if (loading) {

        return (
            <h1 className="text-center text-3xl mt-10">
                Loading...
            </h1>
        );

    }

    return (

        <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

            <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
                My Profile
            </h1>

            <div className="space-y-4">

                <div>

                    <label className="font-bold">
                        Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        disabled={!editMode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mt-2"
                    />

                </div>

                <div>

                    <label className="font-bold">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        disabled={!editMode}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mt-2"
                    />

                </div>

                <p>

                    <strong>Member Since:</strong>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}

                </p>

            </div>

            <div className="flex gap-4 mt-8">

                {!editMode ? (

                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
                    >
                        Edit Profile
                    </button>

                ) : (

                    <button
                        onClick={updateProfile}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Save Changes
                    </button>

                )}

                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Profile;
