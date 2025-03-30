import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FileX,
    Fullscreen,
    X,
    Trash,
    ChevronLeft,
    Image,
    Edit,
    Save,
} from "lucide-react"; // Lucide icons
import LeftNavbar from "../components/LeftNavBar";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Cloudinary Config
const CLOUDINARY_CLOUD_NAME = "dh53bxmsk"; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = "jagvvfvr"; // Replace with your upload preset

const EPrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState("");
    const [selectedPrescription, setSelectedPrescription] = useState(null); // For modal
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [prescriptionToDelete, setPrescriptionToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [editedText, setEditedText] = useState(""); // Store edited text
    const { user } = useAuthStore();

    const API_URL =
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api/prescriptions"
            : "/api/prescriptions";

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get(API_URL, {
                    withCredentials: true,
                });
                setPrescriptions(response.data.prescriptions || []);
            } catch (error) {
                console.error("Error fetching prescriptions:", error);
            }
        };

        fetchPrescriptions();
    }, []);

    const handleSaveEdit = async () => {
        if (!selectedPrescription || !editedText) return;

        try {
            await axios.patch(
                `${API_URL}/update-ocr/${selectedPrescription._id}`,
                { ocrText: editedText }, // Send updated text
                { withCredentials: true }
            );

            // Update local state immediately
            setPrescriptions((prevPrescriptions) =>
                prevPrescriptions.map((p) =>
                    p._id === selectedPrescription._id
                        ? { ...p, ocrText: editedText } // Update the specific prescription
                        : p
                )
            );

            // Update selectedPrescription to reflect changes in the modal
            setSelectedPrescription((prev) => ({
                ...prev,
                ocrText: editedText, // Update the ocrText in the selected prescription
            }));

            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error("Error updating prescription text:", error);
        }
    };

    const handleUpload = () => {
        window.cloudinary.openUploadWidget(
            {
                cloud_name: CLOUDINARY_CLOUD_NAME,
                upload_preset: UPLOAD_PRESET,
                sources: ["local", "url", "camera"],
                multiple: false,
                folder: "swiftcareAI",
                resource_type: "auto",
                maxFileSize: 5000000, // 5MB max file size
            },
            async (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("Uploaded Successfully: ", result.info);
                    setFileUrl(result.info.secure_url);
                } else {
                    console.error("Upload Error:", error);
                }
            }
        );
    };

    const handleSaveToDB = async () => {
        if (!fileUrl || !fileName) return;

        try {
            await axios.post(
                `${API_URL}/upload`,
                { fileUrl, fileName, email: user.email },
                { withCredentials: true }
            );

            setShowUploadModal(false);
            setFileUrl(null);
            setFileName("");

            // Refresh prescriptions list
            const response = await axios.get(API_URL, {
                withCredentials: true,
            });
            setPrescriptions(response.data.prescriptions);
        } catch (error) {
            console.error("Error saving file:", error);
        }
    };

    const handleDeletePrescription = async (id) => {
        if (!id) return;

        try {
            await axios.delete(`${API_URL}/delete/${id}`, {
                withCredentials: true,
            });

            // Close modal and refresh prescriptions list
            setSelectedPrescription(null);
            const response = await axios.get(API_URL, {
                withCredentials: true,
            });
            setPrescriptions(response.data.prescriptions);
        } catch (error) {
            console.error("Error deleting prescription:", error);
        }
    };

    return (
        <div className="h-screen w-full flex bg-gray-100 z-0">
            {/* Sidebar */}
            <div className="min-w-[300px] bg-white shadow-md">
                <LeftNavbar />
            </div>

            {/* Main Content */}
            <div className="w-full p-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                        E-Prescription
                    </h2>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-all"
                    >
                        Upload Prescription
                    </button>
                </div>

                {/* Horizontal Rule */}
                <hr className="my-6 border-gray-300" />

                {/* Prescription List */}
                <div className="mt-6">
                    {prescriptions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <FileX className="w-16 h-16 mb-3" />
                            <p className="text-lg">
                                No prescriptions uploaded yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription._id}
                                    onClick={() =>
                                        setSelectedPrescription(prescription)
                                    }
                                    className="p-4 rounded-lg border shadow-md hover:shadow-lg transition-all flex flex-col items-center cursor-pointer bg-emerald-700/5 ring-1 ring-gray-900/10"
                                >
                                    {/* Prescription Image */}
                                    <img
                                        src={prescription.fileUrl}
                                        alt={prescription.fileName}
                                        className="w-full h-48 object-cover rounded-md bg-white ring-1 ring-gray-900/10"
                                    />

                                    {/* Prescription Name */}
                                    <h4 className="font-semibold text-gray-700 mt-3 truncate w-full text-center">
                                        {prescription.fileName}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Prescription Modal */}
            {selectedPrescription && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white p-6 rounded-lg shadow-2xl w-[90vw] max-w-6xl flex"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        {/* Prescription Image Section */}
                        <div className="w-1/2 p-4 relative flex items-center justify-center">
                            <img
                                src={selectedPrescription.fileUrl}
                                alt={selectedPrescription.fileName}
                                className="w-full max-h-[80vh] object-cover rounded-md drop-shadow-lg"
                            />

                            {/* Fullscreen View Button */}
                            <a
                                href={selectedPrescription.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute flex items-center justify-center bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-30 text-white px-4 py-2 rounded-md text-sm transition-all hover:bg-opacity-50"
                            >
                                <Fullscreen className="h-5 w-5 mr-2" />
                                View Fullscreen
                            </a>
                            <button
                                onClick={() => {
                                    setPrescriptionToDelete(
                                        selectedPrescription._id
                                    );
                                    setShowDeleteConfirm(true);
                                }}
                                className="absolute bottom-4 left-0 flex items-center gap-2 text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg transition-all"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Right: Prescription Details */}
                        <div className="w-1/2 p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <h3 className="text-xl font-semibold text-green-700">
                                        Prescription Details
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setIsEditing(true);
                                            setEditedText(
                                                selectedPrescription.ocrText ||
                                                    ""
                                            ); // Populate with current text
                                        }}
                                        className="text-gray-500 hover:text-blue-500 hover:bg-blue-100 p-2 ml-4 rounded-lg"
                                    >
                                        <Edit className="w-6 h-6" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedPrescription(null);
                                        setIsEditing(false);
                                    }}
                                    className="text-gray-500 hover:text-red-500 hover:bg-red-100 p-2 rounded-lg"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="h-[80vh] overflow-scroll">
                                {isEditing ? (
                                    <textarea
                                        value={editedText}
                                        onChange={(e) =>
                                            setEditedText(e.target.value)
                                        }
                                        className="w-full h-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-600"
                                    />
                                ) : (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {selectedPrescription.ocrText ||
                                            "No text extracted from this prescription."}
                                    </ReactMarkdown>
                                )}
                            </div>
                            {isEditing && (
                                <div className="flex justify-end gap-3 mt-5">
                                    <button
                                        onClick={handleSaveEdit}
                                        className="flex items-center justify-center bg-green-200 drop-shadow-lg hover:bg-green-300 hover:text-green-600 font-semibold text-green-500 px-5 py-2 rounded-lg transition-all"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            Confirm Deletion
                        </h3>
                        <p className="text-gray-600">
                            Are you sure you want to delete this prescription?
                        </p>
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={() => {
                                    handleDeletePrescription(
                                        prescriptionToDelete
                                    );
                                    setShowDeleteConfirm(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                    >
                        {/* Close Button */}
                        <div className="flex items-center justify-start mb-4">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="text-gray-500 hover:text-red-500 hover:bg-red-100 p-2 rounded-lg mr-4"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h3 className="text-xl font-semibold text-gray-700">
                                Upload Prescription
                            </h3>
                        </div>

                        <button
                            onClick={handleUpload}
                            className="bg-gray-100 hover:border-yellow-500 border-2 hover:border-dashed text-yellow-500 font-semibold px-5 py-2 rounded-lg w-full transition-all flex items-center justify-center"
                        >
                            <span className="mr-2 py-5">
                                <Image />
                            </span>{" "}
                            Choose Image
                        </button>

                        {fileUrl && (
                            <div className="mt-4 text-center">
                                <a
                                    href={fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    <img
                                        src={fileUrl}
                                        alt="Uploaded image"
                                        className="w-full object-cover rounded-md"
                                    />
                                </a>
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Enter Prescription Name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="mt-3 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-600"
                        />

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-3 mt-5">
                            <button
                                onClick={handleSaveToDB}
                                className="flex items-center justify-center bg-green-200 drop-shadow-lg hover:bg-green-300 hover:text-green-600 font-semibold text-green-500 px-5 py-2 rounded-lg transition-all"
                            >
                                Upload
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default EPrescriptionPage;
