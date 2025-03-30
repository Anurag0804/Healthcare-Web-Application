const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon className="w-5 h-5 text-green-500" />
            </div>
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 bg-white rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-500 transition duration-200"
                placeholder={props.placeholder} // Ensure placeholder is passed correctly
            />
        </div>
    );
};

export default Input;
