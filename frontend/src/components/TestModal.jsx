import { motion } from "framer-motion";
import {
    X,
    ClipboardCheck,
    DollarSign,
    ShieldCheck,
    FlaskConical,
    Clock,
    PlusCircle,
    FileText,
    AlertTriangle,
    Eye,
} from "lucide-react";

const TestModal = ({ test, onClose }) => {
    if (!test) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[80vh] flex flex-col"
            >
                {/* Header (Fixed) */}
                <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                        {test.icon} {test.name}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto flex-1 mt-4 pr-2 pb-2">
                    <p className="text-gray-700">{test.description}</p>

                    <div className="mt-4 space-y-4">
                        {/* Grid Structure for Key Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                                <ShieldCheck
                                    className="text-green-500"
                                    size={20}
                                />
                                <div>
                                    <strong className="block">
                                        Who Should Take:
                                    </strong>
                                    <p className="text-sm text-gray-700">
                                        {test.who_should_take}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                                <DollarSign
                                    className="text-yellow-500"
                                    size={20}
                                />
                                <div>
                                    <strong className="block">Cost:</strong>
                                    <p className="text-sm text-gray-700">
                                        ₹{test.average_cost}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                                <FlaskConical
                                    className="text-blue-500"
                                    size={20}
                                />
                                <div>
                                    <strong className="block">
                                        Test Type:
                                    </strong>
                                    <p className="text-sm text-gray-700">
                                        {test.test_type}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                                <Eye className="text-purple-500" size={20} />
                                <div>
                                    <strong className="block">
                                        Body Part:
                                    </strong>
                                    <p className="text-sm text-gray-700">
                                        {test.body_part}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2 col-span-2">
                                <ClipboardCheck
                                    className="text-indigo-500"
                                    size={20}
                                />
                                <div>
                                    <strong className="block">
                                        Preparation:
                                    </strong>
                                    <p className="text-sm text-gray-700">
                                        {test.preparation}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Frequency */}
                        <div className="bg-gray-100 p-3 rounded-lg flex items-center gap-2">
                            <Clock className="text-gray-500" size={20} />
                            <div>
                                <strong className="block">
                                    Recommended Frequency:
                                </strong>
                                <p className="text-sm text-gray-700">
                                    {test.frequency}
                                </p>
                            </div>
                        </div>

                        {/* Common Markers Measured */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
                            <div className="flex items-center gap-2">
                                <FileText className="text-blue-500" size={20} />
                                <strong>Common Markers Measured:</strong>
                            </div>
                            <ul className="list-disc ml-6 text-gray-700 mt-2">
                                {test.common_markers_measured.map(
                                    (marker, index) => (
                                        <li key={index}>{marker}</li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Normal Ranges */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
                            <div className="flex items-center gap-2">
                                <PlusCircle
                                    className="text-green-500"
                                    size={20}
                                />
                                <strong>Normal Ranges:</strong>
                            </div>
                            <ul className="list-disc ml-6 text-gray-700 mt-2">
                                {Object.entries(test.normal_ranges).map(
                                    ([key, value]) => (
                                        <li key={key}>
                                            {key}: {value}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Indications */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
                            <div className="flex items-center gap-2">
                                <AlertTriangle
                                    className="text-red-500"
                                    size={20}
                                />
                                <strong>Indications:</strong>
                            </div>
                            <ul className="list-disc ml-6 text-gray-700 mt-2">
                                {test.indications.map((indication, index) => (
                                    <li key={index}>{indication}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Interpretation */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow">
                            <div className="flex items-center gap-2">
                                <FlaskConical
                                    className="text-orange-500"
                                    size={20}
                                />
                                <strong>Interpretation:</strong>
                            </div>
                            <ul className="list-disc ml-6 text-gray-700 mt-2">
                                <li>
                                    <strong>Elevated Levels:</strong>{" "}
                                    {test.interpretation.elevated_levels}
                                </li>
                                <li>
                                    <strong>Decreased Levels:</strong>{" "}
                                    {test.interpretation.decreased_levels}
                                </li>
                            </ul>
                        </div>

                        {/* Follow-up Tests (Last Section) */}
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow mb-6">
                            {/* Added mb-6 here */}
                            <div className="flex items-center gap-2">
                                <PlusCircle
                                    className="text-purple-500"
                                    size={20}
                                />
                                <strong>Follow-up Tests:</strong>
                            </div>
                            <ul className="list-disc ml-6 text-gray-700 mt-2">
                                {test.follow_up_tests.map((followUp, index) => (
                                    <li key={index}>{followUp}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TestModal;
