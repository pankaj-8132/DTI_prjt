import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className='flex h-screen'>
			{/* Sidebar */}
			<div className='w-64 bg-gray-900 text-white p-6 space-y-6 shadow-xl'>
				<h2 className='text-2xl font-bold text-green-400'>Menu</h2>
				<nav className='flex flex-col space-y-3'>
					<NavLink
						to='/dashboard/wardrobe'
						className={({ isActive }) =>
							`hover:text-green-400 ${isActive ? "text-green-500 font-semibold" : ""}`
						}
					>
						Wardrobe
					</NavLink>
					<NavLink
						to='/dashboard/profile'
						className={({ isActive }) =>
							`hover:text-green-400 ${isActive ? "text-green-500 font-semibold" : ""}`
						}
					>
						Profile
					</NavLink>
					<NavLink
						to='/dashboard/style-calendar'
						className={({ isActive }) =>
							`hover:text-green-400 ${isActive ? "text-green-500 font-semibold" : ""}`
						}
					>
						Style Calendar
					</NavLink>
					<NavLink
						to='/dashboard/ai-outfit'
						className={({ isActive }) =>
							`hover:text-green-400 ${isActive ? "text-green-500 font-semibold" : ""}`
						}
					>
						AI Outfit Suggestions
					</NavLink>
                    <NavLink
	                to="/dashboard/ai-outfit-generator"
	                className={({ isActive }) =>
		           `hover:text-green-400 ${isActive ? "text-green-500 font-semibold" : ""}`
	                      }
                    >
             	AI Outfit Generator
                </NavLink>
                <NavLink
  to="/dashboard/hairstyle-generator"
  className={({ isActive }) =>
    `hover:text-purple-400 ${isActive ? "text-purple-500 font-semibold" : ""}`
  }
>
  Hairstyle Generator
</NavLink>
				</nav>
			</div>

			<div className='flex-1 overflow-y-auto bg-gray-100 p-6'>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
