import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { Stethoscope, FlaskConical, FileText } from "lucide-react";

const HomePage = () => {
    const { isAuthenticated } = useAuthStore();
    return (
        <div className="min-h-screen w-full bg-white overflow-y-auto">
            <Navbar />

            {/* Main Content */}
            <div className="max-w-7xl w-full mx-auto pt-32 px-4">
                {/* Hero Section */}
                <div className="mt-10 flex flex-col gap-5 md:flex-row justify-between items-center md:h-fit">
                    {/* Left Content */}
                    <div className="md:mb-0 w-[50%]">
                        <h1 className="text-6xl md:text-7xl leading-tight font-bold text-gray-800">
                            Welcome to{" "}
                            <span className="text-green-600">SwiftCare.ai</span>
                        </h1>
                        <p className="text-gray-700 text-lg mt-6">
                            Your AI-powered healthcare platform for symptom
                            analysis, medical test recommendations, and health
                            record management.
                        </p>
                        <Link to={!isAuthenticated ? "/signup" : "/dashboard"}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-8 px-8 py-3 bg-green-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 cursor-pointer"
                            >
                                {!isAuthenticated ? "Get Started" : "Dashboard"}
                            </motion.button>
                        </Link>
                    </div>

                    {/* Right Image */}
                    <div className="md:w-[50%]">
                        <img
                            src="https://www.hdwallpapers.in/download/beautiful_green_scenery_hd_green-1600x900.jpg"
                            alt="SwiftCare.ai"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-40 text-center">
                    <div>
                        <h2 className="text-green-600 text-[32px] md:text-[40px] font-bold leading-tight">
                            Comprehensive Healthcare Solutions
                        </h2>
                        <h3 className="text-gray-800 text-[32px] md:text-[40px] font-bold mt-[-10px]">
                            All in one platform
                        </h3>
                        <p className="text-gray-700 mt-2 text-lg">
                            Explore our features designed to enhance your health
                            management.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="md:grid grid-cols-3 flex flex-col justify-evenly md:flex-row mx-7 md:mx-0 gap-6 mt-6">
                        {/* Symptom Analyzer Card */}
                        <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                            <div className="w-14 h-14 bg-green-200 rounded-br-3xl rounded-tl-3xl rounded-bl-lg rounded-tr-lg mb-6 mx-auto flex items-center justify-center">
                                <Stethoscope
                                    size={40}
                                    className="text-green-600"
                                />
                            </div>
                            <h4 className="text-green-600 text-2xl font-bold mb-4">
                                Symptom Analyzer
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Interact with our AI chatbot to analyze your
                                symptoms and receive personalized health
                                insights.
                            </p>
                        </div>

                        {/* Smart Test Guide Card */}
                        <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                            <div className="w-14 h-14 bg-green-200 rounded-br-3xl rounded-tl-3xl rounded-bl-lg rounded-tr-lg mb-6 mx-auto flex items-center justify-center">
                                <FlaskConical
                                    size={40}
                                    className="text-green-600"
                                />
                            </div>
                            <h4 className="text-green-600 text-2xl font-bold mb-4">
                                Smart Test Guide
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Get AI-driven recommendations for necessary
                                medical tests based on your symptoms.
                            </p>
                        </div>

                        {/* HealthVault Card */}
                        <div className="bg-gray-100 rounded-lg p-8 shadow-md">
                            <div className="w-14 h-14 bg-green-200 rounded-br-3xl rounded-tl-3xl rounded-bl-lg rounded-tr-lg mb-6 mx-auto flex items-center justify-center">
                                <FileText
                                    size={40}
                                    className="text-green-600"
                                />
                            </div>
                            <h4 className="text-green-600 text-2xl font-bold mb-4">
                                HealthVault
                            </h4>
                            <p className="text-gray-600 text-base leading-relaxed">
                                Store and manage your medical records, upload
                                prescriptions, and use OCR technology to extract
                                text from images.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="my-20 flex flex-col md:flex-row justify-center items-center text-center md:h-fit">
                    <div className="">
                        <h2 className="text-5xl md:text-4xl font-bold text-gray-800 leading-tight">
                            SwiftCare.ai offers
                            <br />
                            <span className="text-green-600">
                                a comprehensive health management experience
                            </span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-fit bg-gray-200 py-5 px-10 md:px-0">
                <div className="max-w-7xl mx-auto h-full grid grid-cols-2 md:grid-cols-3 justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img
                            className="w-10 h-10 no-select"
                            alt="SwiftCare.ai Logo"
                            src="logo.png"
                        />
                        <span className="text-3xl font-semibold text-gray-800 no-select">
                            SwiftCare.ai
                        </span>
                    </div>

                    <p className="text-gray-600 mt-2 md:mt-0 text-center hidden md:block no-select">
                        Copyright © 2025 SwiftCare.ai
                    </p>
                    <div className="flex flex-row justify-end items-end no-select">
                        <a
                            href="https://github.com/Anurag0804/Healthcare-Web-Application"
                            target="_blank"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-2 py-2 px-3 bg-green-600 text-white font-medium drop-shadow-md rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white transition duration-200 cursor-pointer flex flex-row items-center gap-3"
                            >
                                <img
                                    src="Github.svg"
                                    alt=""
                                    className="w-5 h-5"
                                />
                                GitHub Repository
                            </motion.button>
                        </a>
                    </div>
                </div>
                <p className="text-gray-600 mt-5 text-center block md:hidden">
                    Copyright © 2025 SwiftCare.ai
                </p>
            </footer>
        </div>
    );
};

export default HomePage;
