
import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import WardrobePage from "./pages/WardrobePage";
import DashboardLayout from "./layouts/DashboardLayout";
import StyleCalendarPage from "./pages/StyleCalendar";
import AiOutfitSuggestionsPage from "./pages/AiOutfitSuggestionsPage";
import AiOutfitGeneratorPage from "./pages/AiOutfitGeneratorPage";
import HairstyleGeneratorPage from "./pages/HairstyleGeneratorPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/dashboard' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden'>
			{/* Background Floating Shapes */}
			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<HomePage />} />
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				{/* Protected Routes under /dashboard/* */}
				<Route
					path='/dashboard/*'
					element={
						<ProtectedRoute>
							<DashboardLayout />
						</ProtectedRoute>
					}
				>
					<Route path='' element={<DashboardPage />} />
					<Route path='wardrobe' element={<WardrobePage />} />
					<Route path='style-calendar' element={<StyleCalendarPage />} />
					<Route path='ai-outfit' element={<AiOutfitSuggestionsPage />} />
					<Route path='ai-outfit-generator' element={<AiOutfitGeneratorPage />} />
					<Route path='hairstyle-generator' element={<HairstyleGeneratorPage />} /> {/* ✅ Corrected path */}
				</Route>

				{/* Catch All */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;
