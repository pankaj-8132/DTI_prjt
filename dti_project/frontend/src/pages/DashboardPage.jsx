import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div className='p-6 space-y-6'>
			{/* Header Section */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between bg-gray-900 text-white p-6 rounded-2xl shadow-lg'>
				<div>
					<h2 className='text-3xl font-bold text-green-400 mb-2'>Dashboard</h2>
					<p className='text-sm text-gray-300'>
						Name: {user.name} <br />
						Email: {user.email} <br />
						Joined: {new Date(user.createdAt).toLocaleDateString()} <br />
						Last Login: {new Date(user.lastLogin).toLocaleString()}
					</p>
				</div>

				<div className='mt-4 md:mt-0 flex gap-4'>
					<button
						onClick={handleLogout}
						className='px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow'
					>
						Logout
					</button>
					<button
						onClick={() => navigate("/wardrobe")}
						className='px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow'
					>
						Open Wardrobe
					</button>
				</div>
			</div>

			{/* Main Content Section */}
			<div className='bg-white/5 p-6 rounded-2xl text-white shadow-lg'>
				{/* Replace this with actual dashboard widgets/stats */}
				<h3 className='text-xl font-semibold text-green-300 mb-2'>Welcome to your dashboard!</h3>
				<p className='text-gray-300'>Here you can manage your wardrobe, check stats, and more.</p>
			</div>
		</div>
	);
};

export default DashboardPage;
