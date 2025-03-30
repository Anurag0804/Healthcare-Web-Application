import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Settings,
    FileText,
    Clipboard,
    HeartPulse,
    MessageCircle,
    LogOut,
} from "lucide-react"; // Importing icons from Lucide React

const LeftNavbar = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation(); // Get the current location

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            {/* Navbar */}
            <div className="h-screen w-full bg-white shadow-lg relative z-40">
                {/* Logo Section */}
                <Link to="/">
                    <div className="w-full flex items-center justify-center px-8 py-8 mb-4 bg-gradient-to-r from-emerald-900 to-green-600">
                        <img
                            className="w-10 h-10 object-cover drop-shadow-lg"
                            alt="Logo"
                            src="logo.png"
                        />
                        <h1 className="ml-3 text-2xl font-bold text-white no-select">
                            SwiftCare.ai
                        </h1>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav className="px-4 space-y-3">
                    <Link
                        to="/dashboard"
                        className={`flex items-center p-4 ${
                            location.pathname === "/dashboard"
                                ? "bg-green-100 text-green-600"
                                : "hover:bg-green-100 text-gray-800"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                    >
                        <LayoutDashboard
                            className={`w-6 h-6 ${
                                location.pathname === "/dashboard"
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }`}
                        />
                        <span className="ml-3 font-medium no-select">
                            Dashboard
                        </span>
                    </Link>

                    <Link
                        to="/symptom-analyzer"
                        className={`flex items-center p-4 ${
                            location.pathname === "/symptom-analyzer"
                                ? "bg-green-100 text-green-600"
                                : "hover:bg-green-100 text-gray-800"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                    >
                        <MessageCircle
                            className={`w-6 h-6 ${
                                location.pathname === "/symptom-analyzer"
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }`}
                        />
                        <span className="ml-3 font-medium no-select">
                            Symptom Analyzer
                        </span>
                    </Link>

                    <Link
                        to="/smart-test-guide"
                        className={`flex items-center p-4 ${
                            location.pathname === "/smart-test-guide"
                                ? "bg-green-100 text-green-600"
                                : "hover:bg-green-100 text-gray-800"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                    >
                        <Clipboard
                            className={`w-6 h-6 ${
                                location.pathname === "/smart-test-guide"
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }`}
                        />
                        <span className="ml-3 font-medium no-select">
                            Smart Test Guide
                        </span>
                    </Link>

                    <Link
                        to="/healthvault"
                        className={`flex items-center p-4 ${
                            location.pathname === "/healthvault"
                                ? "bg-green-100 text-green-600"
                                : "hover:bg-green-100 text-gray-800"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                    >
                        <HeartPulse
                            className={`w-6 h-6 ${
                                location.pathname === "/healthvault"
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }`}
                        />
                        <span className="ml-3 font-medium no-select">
                            Health Vault
                        </span>
                    </Link>

                    <Link
                        to="/eprescription"
                        className={`flex items-center p-4 ${
                            location.pathname === "/eprescription"
                                ? "bg-green-100 text-green-600"
                                : "hover:bg-green-100 text-gray-800"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                    >
                        <FileText
                            className={`w-6 h-6 ${
                                location.pathname === "/eprescription"
                                    ? "text-green-600"
                                    : "text-gray-800"
                            }`}
                        />
                        <span className="ml-3 font-medium no-select">
                            E-Prescription
                        </span>
                    </Link>
                </nav>

                {/* User Profile Section */}
                <div className="absolute bottom-8 left-0 right-0 px-6">
                    <Link to="/profile">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center w-full h-[55px] mb-4 p-2 bg-white drop-shadow-lg ${
                                location.pathname === "/profile"
                                    ? "bg-green-100 text-green-600"
                                    : "text-gray-800"
                            } hover:bg-green-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                        >
                            <img
                                className="w-10 h-10 ml-[10px] rounded-full drop-shadow-lg no-select"
                                alt="Profile"
                                src="/profile.png"
                            />
                            <span
                                className={`ml-3 no-select ${
                                    location.pathname === "/profile"
                                        ? "text-green-600"
                                        : "text-gray-800"
                                } font-medium`}
                            >
                                {user.name}
                            </span>
                        </motion.button>
                    </Link>
                    <div className="flex gap-4 h-[55px]">
                        <Link to="/settings">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center cursor-pointer justify-center h-[55px] w-[55px] p-2 bg-white drop-shadow-lg ${
                                    location.pathname === "/settings"
                                        ? "bg-green-100 text-green-600"
                                        : "text-gray-800"
                                } rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200`}
                            >
                                <Settings
                                    className={`w-6 h-6 ${
                                        location.pathname === "/settings"
                                            ? "text-green-600"
                                            : "text-gray-800"
                                    }`}
                                />
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center cursor-pointer justify-center flex-grow p-2 bg-white text-gray-800 hover:bg-red-100 drop-shadow-lg hover:text-red-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-white transition duration-200"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-6 h-6 mr-2" />
                            <span className="no-select">Log out</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeftNavbar;
