import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import SymptomAnalyzerPage from "./pages/SymptomAnalyzerPage";
import SmartTestGuidePage from "./pages/SmartTestGuidePage";
import HealthVaultPage from "./pages/HealthVaultPage";
import EPrescriptionPage from "./pages/EPrescriptionPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user.isVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    return children;
};

// redirect authenticated users to the dashboard page
// eslint-disable-next-line react/prop-types
const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
        if (user.preferredLanguage === "") {
            return <Navigate to="/chat" replace />;
        }
        return <Navigate to="/dashboard" replace />;
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
        <div
            className="min-h-screen bg-gradient-to-br
    from-white via-green-100 to-white flex items-center justify-center relative overflow-hidden"
        >
            <FloatingShape
                color="bg-green-300"
                size="w-64 h-64"
                top="-5%"
                left="10%"
                delay={0}
            />
            <FloatingShape
                color="bg-green-400"
                size="w-48 h-48"
                top="70%"
                left="80%"
                delay={5}
            />
            <FloatingShape
                color="bg-green-500"
                size="w-32 h-32"
                top="40%"
                left="-10%"
                delay={2}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/signup"
                    element={
                        <RedirectAuthenticatedUser>
                            <SignUpPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthenticatedUser>
                            <LoginPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/verify-email"
                    element={
                        <RedirectAuthenticatedUser>
                            <EmailVerificationPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <RedirectAuthenticatedUser>
                            <ForgotPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/reset-password/:token"
                    element={
                        <RedirectAuthenticatedUser>
                            <ResetPasswordPage />
                        </RedirectAuthenticatedUser>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/symptom-analyzer"
                    element={
                        <ProtectedRoute>
                            <SymptomAnalyzerPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/smart-test-guide"
                    element={
                        <ProtectedRoute>
                            <SmartTestGuidePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/healthvault"
                    element={
                        <ProtectedRoute>
                            <HealthVaultPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/eprescription"
                    element={
                        <ProtectedRoute>
                            <EPrescriptionPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />
                {/* catch all routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
