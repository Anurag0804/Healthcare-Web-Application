import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
    const { isAuthenticated, user } = useAuthStore();
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-10 md:px-0 bg-white bg-opacity-90 h-fit py-5 shadow-md">
            <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                {/* Left side - Logo and Brand */}
                <Link to="/">
                    <div className="flex items-center gap-2 no-select">
                        <img
                            className="w-10 h-10 object-cover drop-shadow-lg"
                            alt="Logo"
                            src="logo.png"
                        />
                        {/* Using Lucide logo */}
                        <span className="text-3xl font-semibold text-gray-800">
                            SwiftCare.ai
                        </span>
                    </div>
                </Link>

                {/* Center section - Links for authenticated users */}
                {isAuthenticated && (
                    <div className="flex gap-5">
                        <Link
                            to="/dashboard"
                            className="text-gray-800 hover:text-green-600 p-2 rounded-lg transition duration-200"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/symptom-analyzer"
                            className="text-gray-800 hover:text-green-600 p-2 rounded-lg transition duration-200"
                        >
                            Symptom Analyzer
                        </Link>
                        <Link
                            to="/smart-test-guide"
                            className="text-gray-800 hover:text-green-600 p-2 rounded-lg transition duration-200"
                        >
                            Smart Test Guide
                        </Link>
                        <Link
                            to="/healthvault"
                            className="text-gray-800 hover:text-green-600 p-2 rounded-lg transition duration-200"
                        >
                            Health Vault
                        </Link>
                        <Link
                            to="/eprescription"
                            className="text-gray-800 hover:text-green-600 p-2 rounded-lg transition duration-200"
                        >
                            E-Prescription
                        </Link>
                    </div>
                )}

                {/* Right side - Conditional Rendering */}
                <div className="flex gap-3">
                    {isAuthenticated ? (
                        <Link to="/profile">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center w-full p-2 bg-gray-100 drop-shadow-lg hover:bg-green-100 text-gray-800 hover:text-green-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 cursor-pointer"
                            >
                                <img
                                    className="w-6 h-6 mr-2 rounded-full drop-shadow-lg no-select"
                                    alt="Profile"
                                    src="/profile.png"
                                />
                                <span className="">{user.name}</span>
                            </motion.button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-2 px-3 text-green-600 font-medium hover:underline underline-offset-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 cursor-pointer"
                                >
                                    Login
                                </motion.button>
                            </Link>
                            <Link to="/signup">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-2 px-3 bg-green-600 font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 cursor-pointer"
                                >
                                    Sign up
                                </motion.button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
