import { motion } from "framer-motion";
import LeftNavbar from "../components/LeftNavBar";
import { Heart, FileText, Search, Clipboard } from "lucide-react"; // Importing icons
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom"; // Import Link for navigation

const DashboardPage = () => {
    const { user } = useAuthStore();
    return (
        <div className="h-screen w-full flex">
            {/* Left Sidebar */}
            <div className="min-w-[300px]">
                <LeftNavbar />
            </div>

            {/* Middle Section */}
            <div className="flex-1 p-8 flex flex-col z-0">
                <h2 className="text-6xl font-bold mb-6 text-center text-emerald-600">
                    Hello, {user.name}!
                </h2>
                <p className="text-2xl font-bold mb-6 text-center text-black">
                    Hope your health is good... 😊
                </p>

                <div className="flex flex-col items-center justify-center w-full h-full">
                    <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                        What This Application Can Do
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
                        {/* Card Component */}
                        {[
                            {
                                title: "Symptom Analyzer",
                                description:
                                    "Input your symptoms through a questionnaire or free text. The AI analyzes your symptoms and provides possible conditions or recommendations.",
                                example:
                                    "If you have a headache and nausea, the analyzer may suggest possible conditions and recommend seeing a doctor.",
                                icon: (
                                    <Heart
                                        size={40}
                                        className="text-emerald-500"
                                    />
                                ),
                                link: "/symptom-analyzer",
                            },
                            {
                                title: "Health Vault",
                                description:
                                    "Manage your personal health vault by creating sections to store text entries and files.",
                                example:
                                    'You can create a section for "Eye Health" to store medical records and notes about your eye condition.',
                                icon: (
                                    <FileText
                                        size={40}
                                        className="text-emerald-500"
                                    />
                                ),
                                link: "/healthvault",
                            },
                            {
                                title: "Smart Test Guide",
                                description:
                                    "Explore various tests and their details. Search for specific tests and view their descriptions.",
                                example:
                                    "If you're unsure about a blood test, you can search for it to find out what it entails and when to take it.",
                                icon: (
                                    <Search
                                        size={40}
                                        className="text-emerald-500"
                                    />
                                ),
                                link: "/smart-test-guide",
                            },
                            {
                                title: "E-Prescription",
                                description:
                                    "Manage your electronic prescriptions by uploading new prescriptions, viewing existing ones, and deleting them if necessary.",
                                example:
                                    "After a doctor's visit, you can upload your prescription and receive insights based on OCR + AI analysis.",
                                icon: (
                                    <Clipboard
                                        size={40}
                                        className="text-emerald-500"
                                    />
                                ),
                                link: "/eprescription",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="p-6 bg-white rounded-lg shadow-md border border-gray-300 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
                            >
                                {/* Icon */}
                                <div className="mb-4">{item.icon}</div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600">
                                    {item.description}
                                </p>

                                {/* Example */}
                                <p className="mt-3 text-sm text-gray-500">
                                    <strong>Example Scenario:</strong>{" "}
                                    {item.example}
                                </p>

                                {/* Link */}
                                <Link
                                    to={item.link}
                                    className="mt-5 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
                                >
                                    Explore {item.title}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
