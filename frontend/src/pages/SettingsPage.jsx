import { motion } from "framer-motion";
import LeftNavbar from "../components/LeftNavBar";

const SettingsPage = () => {
    return (
        <div className="h-screen w-full flex">
            <div className="min-w-[300px]">
                <LeftNavbar />
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full h-fit mx-auto mt-10 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl border border-gray-300"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                        Settings
                    </h2>

                    <div className="space-y-6">
                        <motion.div
                            className="p-4 bg-gray-100 bg-opacity-80 rounded-lg border border-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-semibold text-green-500 mb-3">
                                To be implemented
                            </h3>
                            <p className="text-gray-800">
                                This page has not been implemented yet.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SettingsPage;
