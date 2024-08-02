import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import { Edit2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ProfilePage: React.FC = () => {
    const { user, setUser, clearAuth } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/update-profile`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuthStore.getState().token}`,
                },
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            setUser(data.user);
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        clearAuth();
        localStorage.removeItem('authToken');
        navigate('/signin');
    };

    return (
        <div className="profile-page container mx-auto p-4">
            <div className="profile-card bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Profile</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-4 mb-4"
                >
                    <img
                        src="https://shorturl.at/LMjZQ"
                        alt="Avatar"
                        className="w-16 h-16 rounded-full border-2 border-gray-200"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{user?.name}</h3>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </motion.div>
                {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                className="form-input mt-1 block w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                className="form-input mt-1 block w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                className="text-gray-500"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <button
                            className="flex items-center space-x-2 text-blue-500"
                            onClick={() => setIsEditing(true)}
                        >
                            <Edit2 size={20} />
                            <span>Edit Profile</span>
                        </button>
                        <button
                            className="flex items-center space-x-2 text-red-500"
                            onClick={handleLogout}
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
