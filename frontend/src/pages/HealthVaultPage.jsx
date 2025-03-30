import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    PlusCircle,
    Folder,
    FileText,
    Trash2,
    Download,
    Upload,
    Search,
    ExternalLink,
} from "lucide-react";
import LeftNavbar from "../components/LeftNavBar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

const HealthVaultPage = () => {
    const [sections, setSections] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [newSectionName, setNewSectionName] = useState("");
    const [editingFileIndex, setEditingFileIndex] = useState(null);
    const [newFileName, setNewFileName] = useState("");

    const API_URL =
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api/healthVault"
            : "/api/healthVault";

    // Fetch health vault data on component mount
    useEffect(() => {
        const fetchHealthVault = async () => {
            try {
                const response = await axios.get(API_URL, {
                    withCredentials: true,
                });
                setSections(response.data.sections || []);
            } catch (error) {
                console.error("Error fetching health vault:", error);
            }
        };

        fetchHealthVault();
    }, []);

    const saveSectionsToDB = async (updatedSections) => {
        try {
            await axios.post(
                API_URL,
                { sections: updatedSections },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error saving sections to DB:", error);
        }
    };

    const addSection = () => {
        const newSection = {
            name: `New Section ${sections.length + 1}`,
            files: [],
            texts: [],
        };
        setSections([...sections, newSection]);
        saveSectionsToDB([...sections, newSection]); // Save to DB after adding
    };

    const addTextEntry = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].texts.push({
            content: "New Entry", // Default value
            isEditing: true,
        });
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const updateTextEntry = (sectionIndex, textIndex, value) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].texts[textIndex].content = value;
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const saveTextEntry = (sectionIndex, textIndex) => {
        const updatedSections = [...sections];

        // Check if the text is empty
        if (
            updatedSections[sectionIndex].texts[textIndex].content.trim() === ""
        ) {
            // Remove the empty text entry
            updatedSections[sectionIndex].texts.splice(textIndex, 1);
        } else {
            // Otherwise, mark it as not editing
            updatedSections[sectionIndex].texts[textIndex].isEditing = false;
        }

        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const editTextEntry = (sectionIndex, textIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].texts[textIndex].isEditing = true;
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const deleteTextEntry = (sectionIndex, textIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].texts.splice(textIndex, 1);
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const handleFileUpload = async (e, sectionIndex) => {
        const uploadedFiles = Array.from(e.target.files);
        const updatedSections = [...sections];

        for (const file of uploadedFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "jagvvfvr"); // Replace with your upload preset

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/dh53bxmsk/auto/upload`, // Replace with your Cloudinary cloud name
                    formData,
                    { withCredentials: false }
                );
                console.log(response.data.original_filename);
                console.log(response.data.secure_url);
                updatedSections[sectionIndex].files.push({
                    fileName: response.data.original_filename,
                    fileUrl: response.data.secure_url,
                });
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }

        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const startEditingFileName = (sectionIndex, fileIndex, currentFileName) => {
        setEditingFileIndex({ sectionIndex, fileIndex });
        setNewFileName(currentFileName);
    };

    const saveNewFileName = (sectionIndex, fileIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].files[fileIndex].fileName = newFileName;
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
        setEditingFileIndex(null);
    };

    const deleteFile = (sectionIndex, fileIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].files.splice(fileIndex, 1);
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const deleteSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
    };

    const startEditing = (index, name) => {
        setEditingIndex(index);
        setNewSectionName(name);
    };

    const saveNewSectionName = (index) => {
        if (newSectionName.trim() === "") return;
        const updatedSections = [...sections];
        updatedSections[index].name = newSectionName;
        setSections(updatedSections);
        saveSectionsToDB(updatedSections);
        setEditingIndex(null);
    };

    return (
        <div className="h-screen w-full flex bg-gray-100">
            <div className="min-w-[300px] bg-white shadow-md">
                <LeftNavbar />
            </div>

            <div className="w-full p-8 z-0">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                        Health Vault
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center">
                            <Search
                                className="text-gray-400 -mr-7 z-10"
                                size={18}
                            />
                            <input
                                type="text"
                                placeholder="Search sections..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                            />
                        </div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
                            onClick={addSection}
                        >
                            <PlusCircle size={20} /> Add Section
                        </button>
                    </div>
                </div>

                <hr className="mb-10" />

                <div className="space-y-6 max-h-[calc(100vh-160px)] h-full 2xl:mx-40 xl:mx-20 overflow-y-auto pr-4 mb-10">
                    {sections.length > 0 ? (
                        sections
                            .filter((section) =>
                                section.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map((section, sectionIndex) => (
                                <motion.div
                                    key={sectionIndex}
                                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {/* Section Header */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <Folder
                                                size={20}
                                                className="text-green-600"
                                            />

                                            {/* Editable Section Name */}
                                            {editingIndex === sectionIndex ? (
                                                <input
                                                    type="text"
                                                    value={newSectionName}
                                                    onChange={(e) =>
                                                        setNewSectionName(
                                                            e.target.value
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        saveNewSectionName(
                                                            sectionIndex
                                                        )
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            saveNewSectionName(
                                                                sectionIndex
                                                            );
                                                        }
                                                    }}
                                                    className="border border-gray-300 px-2 py-1 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                                                    autoFocus
                                                />
                                            ) : (
                                                <h3
                                                    className="text-xl font-semibold text-green-600 cursor-pointer"
                                                    onClick={() =>
                                                        startEditing(
                                                            sectionIndex,
                                                            section.name
                                                        )
                                                    }
                                                >
                                                    {section.name}
                                                </h3>
                                            )}
                                        </div>
                                        {/* Upload & Delete Buttons */}
                                        <div className="flex items-center gap-4">
                                            <button
                                                className="text-yellow-600 bg-yellow-50 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-200 transition text-sm"
                                                onClick={() =>
                                                    addTextEntry(sectionIndex)
                                                }
                                            >
                                                <PlusCircle size={18} /> Add
                                                Text
                                            </button>
                                            <input
                                                type="file"
                                                multiple
                                                className="hidden"
                                                id={`file-upload-${sectionIndex}`}
                                                onChange={(e) =>
                                                    handleFileUpload(
                                                        e,
                                                        sectionIndex
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`file-upload-${sectionIndex}`}
                                                className="cursor-pointer text-blue-600 bg-blue-50 px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition text-sm"
                                            >
                                                <Upload size={18} /> Upload
                                            </label>

                                            <button
                                                className={`px-3 py-2 rounded-lg flex items-center gap-2 transition text-sm ${
                                                    section.files.length ===
                                                        0 &&
                                                    section.texts.length === 0
                                                        ? "bg-red-200 text-red-600 hover:bg-red-400 hover:text-red-800"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                                onClick={() =>
                                                    deleteSection(sectionIndex)
                                                }
                                                disabled={
                                                    section.files.length > 0 ||
                                                    section.texts.length > 0
                                                }
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* File List */}
                                    <div className="mt-4 space-y-2">
                                        {section.files.length > 0 ? (
                                            section.files.map(
                                                (file, fileIndex) => (
                                                    <div
                                                        key={fileIndex}
                                                        className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <FileText
                                                                size={18}
                                                                className="text-blue-500"
                                                            />
                                                            {editingFileIndex?.fileIndex ===
                                                                fileIndex &&
                                                            editingFileIndex.sectionIndex ===
                                                                sectionIndex ? (
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        newFileName
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setNewFileName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        saveNewFileName(
                                                                            sectionIndex,
                                                                            fileIndex
                                                                        )
                                                                    }
                                                                    onKeyDown={(
                                                                        e
                                                                    ) => {
                                                                        if (
                                                                            e.key ===
                                                                            "Enter"
                                                                        ) {
                                                                            saveNewFileName(
                                                                                sectionIndex,
                                                                                fileIndex
                                                                            );
                                                                        }
                                                                    }}
                                                                    className="border border-gray-300 px-2 py-1 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                                                                    autoFocus
                                                                />
                                                            ) : (
                                                                <span
                                                                    className="cursor-pointer"
                                                                    onClick={() =>
                                                                        startEditingFileName(
                                                                            sectionIndex,
                                                                            fileIndex,
                                                                            file.fileName
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        file.fileName
                                                                    }
                                                                </span>
                                                            )}
                                                        </span>
                                                        <div className="flex gap-6">
                                                            <a
                                                                href={
                                                                    file.fileUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-green-500 hover:text-green-700"
                                                            >
                                                                <ExternalLink
                                                                    size={18}
                                                                />
                                                            </a>
                                                            <button
                                                                className="text-red-500 hover:text-red-700"
                                                                onClick={() =>
                                                                    deleteFile(
                                                                        sectionIndex,
                                                                        fileIndex
                                                                    )
                                                                }
                                                            >
                                                                <Trash2
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <>
                                                {section.files.length === 0 &&
                                                    section.texts.length ===
                                                        0 && (
                                                        <p className="text-gray-500 text-sm">
                                                            No files or text
                                                            added yet.
                                                        </p>
                                                    )}
                                            </>
                                        )}
                                        {/* Text Entries */}
                                        {section.texts.map(
                                            (text, textIndex) => (
                                                <div
                                                    key={textIndex}
                                                    className="bg-gray-100 p-3 rounded-lg mb-2 relative"
                                                >
                                                    {text.isEditing ? (
                                                        <textarea
                                                            value={text.content}
                                                            onChange={(e) =>
                                                                updateTextEntry(
                                                                    sectionIndex,
                                                                    textIndex,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            onBlur={() =>
                                                                saveTextEntry(
                                                                    sectionIndex,
                                                                    textIndex
                                                                )
                                                            }
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                                                            autoFocus
                                                        />
                                                    ) : (
                                                        <div
                                                            onClick={() =>
                                                                editTextEntry(
                                                                    sectionIndex,
                                                                    textIndex
                                                                )
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <ReactMarkdown
                                                                remarkPlugins={[
                                                                    remarkGfm,
                                                                ]}
                                                            >
                                                                {text.content}
                                                            </ReactMarkdown>
                                                        </div>
                                                    )}
                                                    <button
                                                        className="absolute top-2 right-4 text-red-500 hover:text-red-700 mt-2"
                                                        onClick={() =>
                                                            deleteTextEntry(
                                                                sectionIndex,
                                                                textIndex
                                                            )
                                                        }
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            ))
                    ) : (
                        <div className="text-center flex h-full w-full items-center justify-center">
                            <p className="text-gray-600 text-lg mb-4">
                                No sections found.
                            </p>
                        </div>
                    )}
                    {/* Add Section Button at Bottom */}
                    {sections.length > 0 && (
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-gray-300" />
                            <button
                                onClick={addSection}
                                className="flex items-center gap-2 text-green-600 hover:text-green-800 transition text-lg font-semibold px-4"
                            >
                                <PlusCircle size={24} /> Add Section
                            </button>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HealthVaultPage;
