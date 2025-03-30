import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import LeftNavbar from "../components/LeftNavBar";
import TestModal from "../components/TestModal";
import testData from "../store/testDataStore";

const SmartTestGuidePage = () => {
    const [selectedTest, setSelectedTest] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter tests based on search input
    const filteredTests = testData.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-screen w-full flex bg-gray-100">
            {/* Sidebar */}
            <div className="min-w-[300px] bg-white shadow-md">
                <LeftNavbar />
            </div>

            {/* Main Content */}
            <div className="w-full p-8 flex flex-col z-0">
                {/* Header with Title & Search */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                        Smart Test Guide
                    </h2>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Search for a test..."
                            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search
                            className="absolute left-3 top-3 text-gray-500"
                            size={20}
                        />
                    </div>
                </div>

                {/* Horizontal Rule */}
                <hr className="my-6 border-gray-300" />

                {/* Scrollable Test Cards Grid */}
                <div className="flex-1 overflow-y-auto max-h-[calc(100vh-120px)] pb-6">
                    <div className="flex flex-wrap justify-center items-start gap-6">
                        {filteredTests.length > 0 ? (
                            filteredTests.map((test, index) => (
                                <motion.div
                                    key={test.id}
                                    className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer w-64 h-40 flex flex-col items-center justify-center ${
                                        index >= filteredTests.length - 3
                                            ? "mb-6"
                                            : ""
                                    }`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setSelectedTest(test)}
                                >
                                    <div className="text-4xl">{test.icon}</div>
                                    <h3 className="text-xl font-semibold mt-2 text-center">
                                        {test.name}
                                    </h3>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-lg">
                                No tests found.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Test Details */}
            {selectedTest && (
                <TestModal
                    test={selectedTest}
                    onClose={() => setSelectedTest(null)}
                />
            )}
        </div>
    );
};

export default SmartTestGuidePage;
